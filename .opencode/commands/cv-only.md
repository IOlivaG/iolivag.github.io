---
description: Fast CV-only update (no site or README changes)
---

Apply this CV-only change: `$ARGUMENTS`.

Follow `AGENTS.md`. Do **not** touch `src/data/` and do not regenerate the README.

1. Edit `cv/IsaacOlivaCV.tex` only.
2. Compile twice (`pdflatex -interaction=nonstopmode`, or `latexmk -pdf`).
3. Run `npm run sync-cv`.
4. Run `node scripts/verify-cv.mjs --strict` (must be green).
5. Run `npm run build`.
6. Commit only `public/IsaacOlivaCV.pdf`.
7. Back up the source: `git -C cv add -A && git -C cv commit -m "Update CV" && git -C cv push`.
8. Report scope, files changed, and verification result.

If the request implies a publication or education/experience data change, stop and say it is not CV-only.
Do not push the site unless the user asks.
