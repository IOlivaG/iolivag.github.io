#!/usr/bin/env node
// add-paper.mjs — add a publication from a DOI to both sources of truth:
//   src/data/publications.ts and cv/IsaacOlivaCV.tex
//
// Usage: npm run add-paper -- --doi 10.xxxx/yyyy [--dry-run]
// DOI-only (v1). Presentations and unknown Crossref types must be added manually.

import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const pubsFile = resolve(root, 'src', 'data', 'publications.ts');
const cvFile = resolve(root, 'cv', 'IsaacOlivaCV.tex');
const SHORT_NAME = 'I. Oliva-González';

const CATEGORY_BY_TYPE = {
  'journal-article': 'journal',
  'book-chapter': 'book',
  'proceedings-article': 'proceedings',
};

const LATEX_MAP = {
  '\\': '\\textbackslash{}',
  '&': '\\&',
  '%': '\\%',
  '$': '\\$',
  '#': '\\#',
  _: '\\_',
  '{': '\\{',
  '}': '\\}',
  '~': '\\textasciitilde{}',
  '^': '\\textasciicircum{}',
};
const escapeLatex = (s) => String(s).replace(/[\\&%$#_{}~^]/g, (c) => LATEX_MAP[c]);
const deaccent = (s) => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

function initials(given) {
  return given
    .split(/\s+/)
    .filter(Boolean)
    .map((part) =>
      part
        .split('-')
        .map((p) => (p ? `${p[0].toUpperCase()}.` : ''))
        .join('-'),
    )
    .join(' ');
}

function formatAuthor(author) {
  if (!author.family) throw new Error(`Crossref returned an author without 'family': ${JSON.stringify(author)}`);
  return author.given ? `${initials(author.given)} ${author.family}` : author.family;
}

function yearOf(message) {
  for (const key of ['issued', 'published', 'published-print', 'published-online', 'created']) {
    const y = message[key]?.['date-parts']?.[0]?.[0];
    if (y) return String(y);
  }
  return undefined;
}

async function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes('--dry-run');
  const doiFlag = args.indexOf('--doi');
  const doiEq = args.find((a) => a.startsWith('--doi='));
  const doiArg = doiFlag !== -1 ? args[doiFlag + 1] : doiEq?.slice('--doi='.length);

  if (!doiArg) throw new Error('missing DOI. Usage: npm run add-paper -- --doi 10.xxxx/yyyy [--dry-run]');
  const doi = doiArg.replace(/^https?:\/\/doi\.org\//i, '').trim();

  const response = await fetch(`https://api.crossref.org/works/${encodeURIComponent(doi)}`, {
    headers: {
      'User-Agent': 'iolivag-portfolio-add-paper/1.0 (mailto:isaac.oliva23@gmail.com)',
      Accept: 'application/json',
    },
  });
  if (!response.ok) throw new Error(`Crossref returned HTTP ${response.status} for DOI ${doi}`);

  const { message } = await response.json();
  const category = CATEGORY_BY_TYPE[message.type];
  if (!category) {
    throw new Error(`unsupported Crossref type '${message.type}'. Add this entry manually (presentations are manual).`);
  }

  const title = message.title?.[0];
  if (!title) throw new Error('Crossref returned no title');
  const authors = (message.author ?? []).map(formatAuthor);
  if (!authors.length) throw new Error('Crossref returned no authors');

  const container = message['container-title']?.[0] ?? message.event?.name ?? message.publisher ?? '';
  const publisher = message.publisher ?? '';
  const year = yearOf(message);
  if (!year) throw new Error('could not determine the publication year from Crossref');

  const pubsSource = readFileSync(pubsFile, 'utf8');
  if (pubsSource.includes(doi)) throw new Error(`DOI already present in publications.ts: ${doi}`);

  const link = `https://doi.org/${doi}`;
  const venue = escapeLatex(container);

  const parts = [`\\textit{${venue}}`];
  if (category === 'book' || category === 'proceedings') {
    if (publisher) parts.push(escapeLatex(publisher));
  }
  if (message.volume) parts.push(`vol. ${escapeLatex(message.volume)}`);
  if (message.issue) parts.push(`no. ${escapeLatex(message.issue)}`);
  if (message.page) parts.push(`pp. ${escapeLatex(message.page)}`);
  parts.push(`\\textsc{doi}: \\href{${link}}{\\texttt{${escapeLatex(doi)}}}`);
  const citation = parts.join(', ');

  const authorsJson = `[${authors.map((a) => JSON.stringify(a)).join(', ')}]`;
  const tsFields = [
    `category: '${category}'`,
    `authors: ${authorsJson}`,
    `title: ${JSON.stringify(title)}`,
    `journal: ${JSON.stringify(container)}`,
  ];
  if (publisher && (category === 'book' || category === 'proceedings')) {
    tsFields.push(`publisher: ${JSON.stringify(publisher)}`);
  }
  if (message.volume) tsFields.push(`volume: ${JSON.stringify(String(message.volume))}`);
  if (message.issue) tsFields.push(`issue: ${JSON.stringify(String(message.issue))}`);
  if (message.page) tsFields.push(`pages: ${JSON.stringify(String(message.page))}`);
  tsFields.push(`year: ${JSON.stringify(year)}`);
  tsFields.push(`doi: ${JSON.stringify(doi)}`);
  tsFields.push(`links: { paper: ${JSON.stringify(link)} }`);

  const tsBlock = `  {\n${tsFields.map((f) => `    ${f},`).join('\n')}\n  },\n`;

  const authorsTex = authors
    .map((a) => (deaccent(a) === deaccent(SHORT_NAME) ? `\\textbf{${escapeLatex(a)}}` : escapeLatex(a)))
    .join(', ');
  const texBlock = `\\item\n    \\resumePub\n    {${escapeLatex(title)}}\n    {}\n    {${authorsTex}}\n    {${citation}}\n    {${escapeLatex(year)}}\n`;

  const upper = category.toUpperCase();
  const tsClose = `  // === /PUBLICATIONS:${upper} ===`;
  const tsCloseIdx = pubsSource.indexOf(tsClose);
  if (tsCloseIdx === -1) throw new Error(`missing TS marker: ${tsClose}`);

  const texSource = readFileSync(cvFile, 'utf8');
  const texOpenIdx = texSource.indexOf(`% === PUBLICATIONS:${upper} ===`);
  if (texOpenIdx === -1) throw new Error(`missing TeX opening marker for ${upper}`);
  const texEndIdx = texSource.indexOf('\\end{enumerate}', texOpenIdx);
  if (texEndIdx === -1) throw new Error(`missing \\end{enumerate} after the ${upper} marker`);

  if (dryRun) {
    console.log(`[add-paper] DRY RUN — ${title}`);
    console.log(`  category: ${category}`);
    console.log(`  authors : ${authors.join(', ')}`);
    console.log(`  venue   : ${container}`);
    console.log(`  year    : ${year}`);
    console.log(`  doi     : ${doi}`);
    console.log('\n--- src/data/publications.ts ---\n');
    console.log(tsBlock);
    console.log('--- cv/IsaacOlivaCV.tex ---\n');
    console.log(texBlock);
    return;
  }

  writeFileSync(pubsFile, pubsSource.slice(0, tsCloseIdx) + tsBlock + pubsSource.slice(tsCloseIdx), 'utf8');
  writeFileSync(cvFile, texSource.slice(0, texEndIdx) + texBlock + texSource.slice(texEndIdx), 'utf8');

  console.log(`[add-paper] added "${title}" (${category}, ${year})`);
  console.log('[add-paper] next: compile the CV twice, npm run sync-cv, node scripts/verify-cv.mjs --strict');
}

main().catch((error) => {
  console.error(`[add-paper] ${error.message}`);
  process.exitCode = 1;
});
