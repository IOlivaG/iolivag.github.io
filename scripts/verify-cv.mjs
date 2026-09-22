// verify-cv.mjs — warn-only consistency check between the site's single source
// of truth (src/data/publications.ts) and the hand-written CV (cv/IsaacOlivaCV.tex).
//
// The CV is NOT generated from src/data/; it duplicates publication metadata.
// This script detects drift (missing/incorrect DOI, stale "accepted" status,
// divergent titles, misspelled author surnames) so it can be reconciled manually.
//
// Usage: node scripts/verify-cv.mjs [--strict]
//   --strict  exit 1 when mismatches are found (default: always exit 0)
// No dependencies: the publications array literal is evaluated with `new Function`.

import { existsSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const pubsFile = resolve(root, 'src', 'data', 'publications.ts');
const cvFile = resolve(root, 'cv', 'IsaacOlivaCV.tex');
const strict = process.argv.includes('--strict');

const CV_LABEL = { journal: 'J', book: 'B', proceedings: 'C', presentations: 'P' };

if (!existsSync(cvFile)) {
  console.log('[verify-cv] cv/IsaacOlivaCV.tex not found; skipping (CV is local-only).');
  process.exit(0);
}

// --- Extract the `publications` array literal and evaluate it -----------------
function extractArrayLiteral(source) {
  const start = source.indexOf('export const publications');
  if (start === -1) throw new Error('publications declaration not found');
  const eq = source.indexOf('=', start);
  const open = source.indexOf('[', eq); // skip the `Publication[]` type annotation
  if (eq === -1 || open === -1) throw new Error('publications array not found');
  let depth = 0;
  let quote = null;
  for (let i = open; i < source.length; i++) {
    const c = source[i];
    if (quote) {
      if (c === '\\') i++;
      else if (c === quote) quote = null;
      continue;
    }
    if (c === '"' || c === "'" || c === '`') quote = c;
    else if (c === '[') depth++;
    else if (c === ']' && --depth === 0) return source.slice(open, i + 1);
  }
  throw new Error('unterminated publications array');
}

// --- Minimal helpers to compare LaTeX text with plain data -------------------
function stripLatex(s) {
  return s
    .replace(/\\[a-zA-Z]+\*?/g, ' ')
    .replace(/[{}$]/g, ' ')
    .replace(/\\([_%&#])/g, '$1');
}
const deaccent = (s) => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
const norm = (s) => deaccent(stripLatex(s)).toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
const tokens = (s) => new Set(norm(s).split(/\s+/).filter(Boolean));

function jaccard(a, b) {
  if (!a.size || !b.size) return 0;
  let inter = 0;
  for (const t of a) if (b.has(t)) inter++;
  return inter / (a.size + b.size - inter);
}

// --- Parse the CV's \resumePub{title}{abbrev}{authors}{citation}{year} blocks --
function readBracedGroups(text, start, count) {
  const groups = [];
  let i = start;
  while (groups.length < count) {
    while (i < text.length && text[i] !== '{') i++;
    if (i >= text.length) break;
    let depth = 0;
    let j = i;
    let quote = null;
    for (; j < text.length; j++) {
      const c = text[j];
      if (quote) {
        if (c === '\\') j++;
        else if (c === quote) quote = null;
        continue;
      }
      if (c === '"' || c === "'") { quote = c; continue; }
      if (c === '{') depth++;
      else if (c === '}' && --depth === 0) break;
    }
    groups.push(text.slice(i + 1, j));
    i = j + 1;
  }
  return groups;
}

function parseCvEntries(tex) {
  const entries = [];
  const re = /\\resumePub/g;
  let m;
  while ((m = re.exec(tex)) !== null) {
    const g = readBracedGroups(tex, m.index + m[0].length, 5);
    if (g.length === 5) {
      entries.push({
        title: g[0].trim(),
        authors: g[2].trim(),
        citation: g[3].trim(),
        year: g[4].trim(),
      });
    }
  }
  return entries;
}

// --- Run checks ---------------------------------------------------------------
const publications = new Function(`return (${extractArrayLiteral(readFileSync(pubsFile, 'utf8'))});`)();
const tex = readFileSync(cvFile, 'utf8');
const cvEntries = parseCvEntries(tex);
const flatTex = norm(tex); // for lowercase/surname matching
const compactTex = flatTex.replace(/\s+/g, ''); // for DOI digit matching

const issues = [];
const counters = {};

for (const p of publications) {
  counters[p.category] = (counters[p.category] ?? 0) + 1;
  const id = `[${CV_LABEL[p.category]}${counters[p.category]}]`; // numbering follows array order
  const t = tokens(p.title);
  let best = { score: 0, title: '' };
  for (const e of cvEntries) {
    const score = jaccard(t, tokens(e.title));
    if (score > best.score) best = { score, title: e.title };
  }

  if (best.score < 0.6) {
    issues.push(`${id} título distinto:\n      site: "${p.title}"\n      CV  : "${best.title || '(sin coincidencia)'}"`);
  }
  if (p.doi && !compactTex.includes(norm(p.doi).replace(/\s+/g, ''))) {
    issues.push(`${id} DOI ausente en el CV: ${p.doi}`);
  }
  const cvsAccepted = cvEntries.some((e) => /accepted/i.test(e.citation) && jaccard(tokens(e.title), t) >= 0.6);
  const siteAccepted = /accept/i.test(p.status ?? '');
  if (cvsAccepted && !siteAccepted) issues.push(`${id} el CV dice "accepted" pero el sitio ya no: "${p.title}"`);

  for (const author of p.authors) {
    const surname = norm(author.split(/\s+/).pop());
    if (surname && !flatTex.includes(surname)) {
      issues.push(`${id} autor no encontrado en el CV: "${author}" (¿errata?)`);
    }
  }
}

const total = publications.length;
if (issues.length === 0) {
  console.log(`[verify-cv] ✓ ${total}/${total} publicaciones consistentes entre el sitio y el CV.`);
  process.exit(0);
}

console.warn(`[verify-cv] ✗ ${issues.length} posible(s) inconsistencia(s) (${total} publicaciones):`);
for (const issue of issues) console.warn(`  - ${issue}`);
console.warn('[verify-cv] Revisa y reconcilia manualmente (el CV no se autogenera).');
process.exit(strict ? 1 : 0);
