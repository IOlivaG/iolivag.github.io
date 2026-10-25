---
description: Add a publication from a DOI to the site and CV, then verify
---

Add the publication identified by `$ARGUMENTS` (a DOI such as `10.3390/a19050352`).

Follow `AGENTS.md` first (Change intake protocol). This is a **Both** change.

1. Accept a single DOI. If none is given, stop and ask for one (v1 is DOI-only).
2. Fetch `https://api.crossref.org/works/<doi>` and extract: title, authors (given/family),
   container-title, volume, issue, page, issued year, and type.
3. Map `type`: `journal-article` → `journal`; `book-chapter` → `book`;
   `proceedings-article` → `proceedings`. For presentations or unknown types, stop and ask.
4. Format authors as initials + family (e.g. "Isaac Manuel Oliva-González" → "I. M. Oliva-González"),
   preserving accents and author order. If an author has no `family`, stop and ask.
5. Abort if the DOI already exists in `src/data/publications.ts`.
6. Insert the object at the end of its category in `src/data/publications.ts`, inside the
   `// === PUBLICATIONS:<CATEGORY> ===` markers. Set `links.paper` to `https://doi.org/<doi>`.
7. Insert a `\resumePub{title}{}{authors}{citation}{year}` block inside the matching
   `% === PUBLICATIONS:<CATEGORY> ===` markers in `cv/IsaacOlivaCV.tex`.
   - Arg 2 is the venue abbreviation, **NOT** a J-number. Use `{}` unless a short venue name is obvious.
   - `[J3]` / `[C5]` numbering is automatic via `enumerate`; never write it manually.
   - Escape LaTeX specials in free text: `& % # $ { } ~ ^ \ _`.
   - Inside `\texttt{}`, write DOI underscores as `\_`.
8. Compile the CV twice (`pdflatex -interaction=nonstopmode`, or `latexmk -pdf`).
9. Run `npm run sync-cv`.
10. Run `node scripts/verify-cv.mjs --strict` (must be green).
11. Run `npm run build`.
12. Commit only `src/data/publications.ts` and `public/IsaacOlivaCV.pdf` (never `git add -A`).
13. Do **not** push. Report the scope, files changed, verification result, and a suggested commit message.

If any step fails, stop and report. Do not commit on failure.
