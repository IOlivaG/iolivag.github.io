---
description: Verify, publish to main, and check the Actions deploy
---

Publish the current work.

1. Run `git status --short` and `git log --oneline -3`.
2. Run `node scripts/verify-cv.mjs --strict` and `npm run build` (both must be green).
3. If there are uncommitted changes, commit them selectively (never `git add -A`);
   never commit `cv/`, `dist/`, `.astro/`, or `node_modules/`.
4. Ensure you are on `main`, then push: `git switch main` (or merge `wip`) and `git push origin main`.
5. Verify the run through the public REST API (no `gh` auth on this machine):
   - `Invoke-RestMethod "https://api.github.com/repos/IOlivaG/iolivag.github.io/actions/runs?per_page=3"`
   - `Invoke-RestMethod "https://api.github.com/repos/IOlivaG/iolivag.github.io/actions/runs/<id>/jobs"`
6. Confirm `Build Astro site`, `Deploy to GitHub Pages`, and `Sync profile repo` are `success`
   (skipped = missing `PROFILE_DEPLOY_KEY`).
7. Report the run URL and the final status.

Do not force-push. If verification fails, stop and report.
