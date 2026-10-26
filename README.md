# PENG Tea Sourcing

V0.1 bilingual Chinese tea procurement reference and RFQ brief builder. Internal repository: `tea-source`. Public working name: **PENG Tea Sourcing**. Independent of TeaSource / teasource.com. Provisional naming is not completed trademark clearance.

## Run

Node 24 recommended. No production packages, API keys, database or paid services.

```sh
npm ci
npm run build
npm run dev
```

Open `http://127.0.0.1:4173/en/`. English and Chinese are generated as separate static pages, including six tea fieldnotes, regions, buying guide, import checks, RFQ and privacy. Original local SVG illustrations; no external asset requests.

## Verify

```sh
npm test
npx playwright install chromium
npm run test:e2e
```

To test a deployed build: set `TEST_BASE_URL=https://<actual-pages-host>` and run `npm run test:e2e`. The suite covers all 26 localized pages at 320/390/768/1440px, navigation, language switching, filtering, RFQ validation and export, common accessibility checks, no browser errors, local privacy and security headers. Automated accessibility checks do not establish complete WCAG conformance.

## Deploy

Cloudflare Pages Git integration: production branch `main`, build `npm run build`, output `dist`, Node `24`, project name `peng-tea-sourcing`. Set `SITE_URL` if the actual production hostname differs. Source of truth is GitHub, not another machine's working directory. Never force-push over another device's work.

The RFQ is local-only. It creates a copyable/downloadable brief and can open the visitor's mail app without a preset recipient. Nothing is submitted or automatically emailed. No verified supplier, stock, price, certification, test report, or sales history is claimed.

See [research](docs/RESEARCH.md), [product requirements](docs/PRD.md), [blueprint](docs/BLUEPRINT.md), [content plan](docs/CONTENT_PLAN.md), [acceptance](docs/ACCEPTANCE.md) and [deployment](docs/DEPLOYMENT.md).
