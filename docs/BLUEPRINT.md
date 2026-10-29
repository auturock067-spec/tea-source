# V0.1 Technical and Experience Blueprint

Updated 2026-10-26. Implementation specification; test/deployment results are recorded separately.

## Architecture

Native Node.js build → static HTML/CSS/JS and original SVG → `dist/` → Cloudflare Pages Git integration. Node 24 is the deployment target; package engines support Node >=22. There are no production runtime dependencies, Functions, API calls, database or application secrets. Test-only dependencies are pinned through the npm lockfile.

| Source | Responsibility |
|---|---|
| `src/config.mjs` | Public brand, canonical origin (`SITE_URL` override), version and reviewed date. |
| `src/content.mjs` | Bilingual tea/category/region/reference data. |
| `scripts/build.mjs` | Localized document templates, routes, metadata, sitemap, robots, headers, redirects and build identity. |
| `src/app.js` | Progressive mobile navigation, library filtering and local RFQ generation/export. |
| `src/style.css` | Responsive layout, typography, focus states and reduced-motion treatment. |
| `src/*.svg` | Original local artwork/iconography; no third-party asset requests. |
| `scripts/serve.mjs` | Project-owned local preview server; not a production server. |

Only generated `dist/` is rebuilt. Source, docs and evidence must not be erased by the build.

## Routes and page structure

`/en/` and `/zh/` each contain `tea-library/`, six `tea-library/<category>/` detail routes, `tea-regions/`, `sourcing-guide/`, `quality-compliance/`, `request-sourcing/` and `privacy/`. Together with each language home, this is 26 localized pages. Root has an English-first redirect/fallback. `404.html` supplies recovery navigation.

Shared shell: skip link → brand/navigation/menu/language switch → main landmark with one page H1 → footer/privacy/independence notice. Active navigation is identifiable. Page bodies remain crawlable without JavaScript.

Home introduces the buying job and clear next steps; Library supports exploration; detail pages translate styles into buying questions; Regions adds geographic context; Guide sequences the sourcing process; Compliance separates destination checkpoints; RFQ produces a portable artifact; Privacy explains application and hosting behavior.

## RFQ state and data flow

1. Optional allowlisted `tea` query value preselects a category; no email or sensitive brief content goes into the URL.
2. Form input exists in the current document only. Native constraints and description checks run before generation.
3. Generation reads text values and selected labels into a plain-text textarea. No HTML insertion, POST or fetch occurs.
4. Review state offers edit, copy, download and email-draft actions. “Not submitted” remains visible.
5. Clipboard writes happen only on an explicit click; rejection falls back to text selection. Download uses a temporary Blob URL. Mailto opens the visitor's configured app without a recipient; long content instructs attachment.
6. No application localStorage/sessionStorage/cookies hold RFQ fields. Browser autofill/restoration can independently retain form entries; privacy copy states that distinction.

## SEO and identity

Each localized content route gets its own title/description, absolute canonical, English/zh-Hans/x-default alternates and Open Graph metadata. `html lang` matches the page. Sitemap contains localized canonical routes; robots points to the canonical sitemap. Set `SITE_URL` to the verified production origin if the planned hostname differs. Preview builds should not be treated as separate canonical brands.

Central identity configuration supports a future rename. Search all visible templates and export filenames/content when changing the brand, since decorative logo text and RFQ labels also need review. Rebuild and recheck both languages and canonical links after a rename.

## Security, privacy and accessibility

- Generated Cloudflare `_headers` restricts scripts/assets to self and disables network connections/form submissions through CSP. Framing, MIME sniffing and unnecessary device permissions are restricted. Verify actual response headers after deployment; file presence alone is not proof.
- Current stylesheet policy allows inline style attributes used by controlled templates; this is a documented CSP tradeoff, not a claim of the strictest possible policy.
- No embedded analytics, remote fonts or remote image calls. Cloudflare can still process normal request/network metadata under its own policy.
- Required labels, fieldsets, keyboard focus, visible focus styles, status announcements, sensible image alternatives and responsive reading order are part of the acceptance scope.
- Test hostile input as literal text and verify no background PII requests. Never add tokens or credentials to source, docs, screenshots or CI logs.

## Validation and maintenance

Build, Node structural tests and Playwright browser acceptance run before release and in CI. Browser acceptance covers four specified widths, both languages, links, search/filter, menu, RFQ validation/export/edit, accessibility and console failures. Keep evidence tied to the commit. Deployed HTTPS smoke tests cover routes, headers, build identity and Git-triggered update. Rollback is governed by DEPLOYMENT.md.
