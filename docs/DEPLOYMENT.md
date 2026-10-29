# Cloudflare Pages Deployment and Operations

Updated 2026-10-26. **Runbook; deployment, preview and update-trigger verification are pending until real evidence is appended.** A planned hostname is not proof of a deployment.

## Project boundaries and prerequisites

- Canonical code repository: https://github.com/auturock067-spec/tea-source.
- Home laptop checkout: `D:\AgentForge\tea-source`. Keep npm/browser caches and project resources on D where practical. A temporary working copy may be used by the development environment; reconcile it into the named checkout before handoff.
- No changes to other projects. No secret, token, account screenshot with sensitive data, personal RFQ or `.env` file enters Git.
- Use existing GitHub/Cloudflare sessions where authorized. If an account consent, credential, payment or sensitive action is genuinely required, preserve the current checkpoint and request the minimum human action. No paid service is required by this build.

## GitHub is the source of truth

At the start of work on **every device**, inspect the configured origin, run `git fetch origin`, `git status --short --branch`, and review divergence before edits. On a clean production branch, `git pull --ff-only origin main` accepts only a fast-forward. If local changes or divergent commits exist, preserve them on a branch/commit and reconcile through a reviewed merge or PR. Do not force-push, reset away work, or copy an older device checkout over GitHub.

Use a feature branch and PR for changes after the empty-repository bootstrap. CI should install locked dev dependencies, build, run structural checks and browser acceptance. Review the diff and CI status before merging to main. Keep branch protections if configured. Record commit, PR URL, CI run and test evidence in the release report; do not claim checks passed merely because a workflow file exists.

## Local build and acceptance

Use Node 24 and npm. From the repository: `npm ci`, `npm run build`, `npm test`, `npm run test:e2e`. Browser-test prerequisites may require `npx playwright install chromium`; use the project D-drive browser cache where configured. `npm run dev` serves the generated site for local inspection. Read package scripts for exact current commands.

`dist/` is generated output and is not the editing source. The production build needs no API keys or runtime database. Confirm all expected localized files and `_headers`, `_redirects`, `sitemap.xml`, `robots.txt`, `404.html` and `build-info.json` exist before deployment.

## Cloudflare Pages Git integration

| Setting | Value |
|---|---|
| Project name (planned) | `peng-tea-sourcing` |
| Provider / repository | GitHub / `auturock067-spec/tea-source` only |
| Production branch | `main` |
| Framework preset | None |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Root directory | Repository root |
| Build environment | `NODE_VERSION=24` |
| Runtime / Functions / bindings | None |
| Canonical origin | Default `https://peng-tea-sourcing.pages.dev`; set `SITE_URL` to actual production origin if different. |

In Cloudflare: Workers & Pages → Create application → Pages → Connect to Git → select only this repository → configure settings above → deploy. Git integration is deliberately used so pushes trigger builds; do not silently replace it with Direct Upload. Restrict any repository installation permission to this repo where the account permits it.

Non-production branches should produce preview deployments. Validate the PR/branch preview separately from production. Preview success does not prove main is deployed. See official [Git integration guide](https://developers.cloudflare.com/pages/get-started/git-integration/), [GitHub integration](https://developers.cloudflare.com/pages/configuration/git-integration/github-integration/) and [build configuration](https://developers.cloudflare.com/pages/configuration/build-configuration/) (checked 2026-10-26).

## Production verification and automatic-update proof

1. Record Cloudflare deployment identifier, associated Git commit, environment and literal HTTPS URL after successful build/deployment.
2. Open the production URL with a real browser; verify the home page, library, detail links, Chinese route, menu/search and RFQ. Check 320/390/768/1440 layouts using acceptance evidence.
3. HTTP-check all localized routes, assets, root direction, actual unknown-route 404, robots and sitemap. Check actual security headers; verify canonical origin.
4. Read `build-info.json` and match its commit to the expected deployed Git commit. A “local” identity is not sufficient proof of a Git-triggered deployment.
5. Push a small reviewed update through the repository flow, observe the new Git-triggered Cloudflare deployment, and verify its changed commit/build identity at HTTPS. Save both deployment identities. Avoid changes to unrelated projects as a trigger.
6. Record failures and limits honestly in ACCEPTANCE.md and `.codex-loop` evidence. A running local preview or configuration screenshot does not count as production acceptance.

## Rollback and recovery

Official [Cloudflare rollback procedure](https://developers.cloudflare.com/pages/configuration/rollbacks/) (checked 2026-10-26): open this Pages project → Deployments → All deployments → the desired successfully built **production** deployment's three-dot menu → **Rollback to this deployment** → review and confirm. Preview deployments cannot be rollback targets. Verify HTTPS and `build-info.json` after the switch and record source/target deployment IDs.

At the first successful launch, there is no earlier production version to restore. The platform rollback path becomes available after a second eligible production deployment; do not claim a rollback drill passed before that exists. Prefer a controlled drill between two known-safe deployments when practical, then restore the desired production version and verify it. If a real drill was not performed, mark it as documented-only.

A dashboard rollback changes served deployment; it does not repair main. Follow with a reviewed Git revert/fix so the next automatic deployment does not reintroduce the fault. If a build fails, inspect its build log and affected commit, fix on a branch and rerun checks; the failed build must not be reported as a successful update. Never delete the project as a rollback mechanism.

## Routine maintenance

Monthly: check uptime/links, dependency advisories and official compliance changes. Quarterly: review bilingual parity, tea guidance, source dates, metadata and provisional brand risk. Before each update: fetch/status, review diff, run affected checks, merge and verify deployment commit. Keep credentials in platform-managed sessions; no production application secrets are needed. Adding a contact backend, analytics, domain purchase or paid feature requires separate scope/privacy review.

## Release evidence to fill

Production URL: pending. Preview URL: pending. Commit/PR/CI: pending. First deployment ID: pending. Git-triggered update ID: pending. Rollback eligibility/drill: pending. Local/browser/production reports: pending. Account or platform blockers: pending inspection, not assumed.
