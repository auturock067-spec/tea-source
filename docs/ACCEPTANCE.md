# V0.1 Acceptance Matrix

Baseline 2026-10-26. **All execution results below start PENDING.** Replace them only with observed results tied to a commit, command/report or screenshot. Documentation and intended implementation are not test evidence.

## Release gate

V0.1 is accepted only when content/function checks, local build, required browser flows, GitHub code/CI and actual HTTPS production verification pass. Explicitly list any remaining blocker or scoped limitation. Do not describe a planned URL or local-only build as launched.

| ID | Criterion | Measurable check | Initial result |
|---|---|---|---|
| C01 | Complete information architecture | 26 localized content pages: 13 EN + 13 ZH; root entry and 404; six category details in each language. | PENDING |
| C02 | Useful source-backed content | Home, Library, Regions, Guide, Compliance and RFQ present; official references for material tea/compliance claims; review date recorded. | PENDING |
| C03 | Truthful commercial status | No invented suppliers, stock, certifications, prices, tests, customers or service commitments; provisional identity/independence stated. | PENDING |
| C04 | Bilingual parity | Equivalent route/language metadata; terminology, market caveats and no-submission notices agree in both languages. | PENDING |
| F01 | Search/filter | Known tea/origin query returns matching cards; combined category filter works; impossible query shows empty state; reset restores six. | PENDING |
| F02 | Navigation | Every internal anchor and asset resolves; mobile menu expands/collapses; Escape closes/focuses trigger; language switch opens equivalent page. | PENDING |
| F03 | Category handoff | Each of six detail RFQ actions preselects its category; unknown query value does not inject markup or select invalid data. | PENDING |
| F04 | RFQ invalid inputs | Empty required fields, whitespace descriptions, invalid email, missing acknowledgement and quantity outside allowed range cannot generate a brief. | PENDING |
| F05 | RFQ valid flow | Complete both EN/ZH forms; output contains all selected/entered requirements and explicit not-submitted status; edit preserves current form fields. | PENDING |
| F06 | Export | Download produces readable UTF-8 .txt containing current edited brief; clipboard copy matches; blocked clipboard has manual fallback. | PENDING |
| F07 | Email handoff | Mailto has no preset recipient; encoded subject/body correspond to brief or long-brief attachment guidance; UI says visitor must review/send. No actual email is sent in testing. | PENDING |
| Q01 | Build | Locked dependencies install; production build exits 0 and produces expected files; no secrets bundled. | PENDING |
| Q02 | Structural tests | Node test suite exits 0; preserve command output, counts and commit in evidence. | PENDING |
| Q03 | Responsive browser matrix | At 320/390/768/1440 px, all 26 localized pages have document scroll width <= viewport width (+1 px tolerance); text/actions remain usable. | PENDING |
| Q04 | Real visual review | Inspect representative home, library/detail, compliance and RFQ screenshots on phone and desktop; no obscured controls, clipping or unreadable overlap. | PENDING |
| Q05 | JavaScript health | Zero uncaught page errors, serious console/CSP failures or unexpected failed same-origin requests in tested core flows. | PENDING |
| Q06 | Accessibility | Semantic labels/landmarks/H1, keyboard navigation and visible focus; automated critical/serious violation count 0 for tested pages/states; document tool/scope. | PENDING |
| S01 | SEO | Unique localized title/description; valid canonical and EN/zh-Hans/x-default alternates; correct lang; robots/sitemap valid; correct production origin. | PENDING |
| S02 | Safe input/privacy | Hostile RFQ strings remain literal; no form fetch/POST or RFQ browser storage; export only on click; external links safe. | PENDING |
| S03 | Hosted security | Actual production responses contain CSP, nosniff, framing/referrer/device restrictions; HTTPS valid; no mixed content. | PENDING |
| G01 | Repository | Only tea-source changed; actual pushed commit, reviewed diff, PR where applicable and clean/safely documented checkout status. | PENDING |
| G02 | CI | Real GitHub workflow run tied to release commit succeeds; link saved. Workflow presence alone is insufficient. | PENDING |
| D01 | Pages Git integration | Cloudflare project references exact repo/main/build/output; preview branch deployment verified with actual URL/commit. | PENDING |
| D02 | Production | Real HTTPS production URL serves correct release; localized routes, links, RFQ and 404 smoke-tested; build-info commit matches. | PENDING |
| D03 | Automatic update | A subsequent repository push produces a new observed Pages deployment; served commit identity changes accordingly. | PENDING |
| D04 | Recovery | Official rollback path recorded; first-deployment absence of target acknowledged; actual drill/result recorded if performed. | PENDING |

## Evidence record

Record date/time with timezone, repository commit, Node/browser versions, commands and exit codes, total/passed/failed tests, report locations, screenshots and live URLs. Keep personally identifying sample data synthetic (example.com), and exclude credentials/account-sensitive screenshots. Preserve failing evidence when a defect is repaired; rerun the affected check before marking it passed.

Suggested evidence groups: local build/structural report; four-width browser report/screenshots; RFQ download/clipboard/mailto checks; accessibility output; GitHub commit/PR/CI links; Cloudflare preview/production IDs; production HTTP/header/link report; update-trigger and rollback observations. Store durable machine-readable/text logs under `.codex-loop/logs/` or the project's documented evidence folder.

## Known product limitations, not hidden failures

- Educational sourcing information and local brief generation only. A real receiving inbox and supplier-verification operation do not exist in V0.1.
- PENG Tea Sourcing is provisional; complete trademark clearance is outstanding. Exact TeaSource commercial use is documented.
- Guidance does not constitute legal advice or guarantee admission/compliance; exact-product rules must be checked before shipment.
- No buyer interviews, transaction history or revenue claims are asserted.
- Browser coverage and performance results must name their actual environment; automated desktop viewport emulation does not prove testing on physical phones or every browser engine.

## Final release entry

Overall status: PENDING. Accepted commit: PENDING. Production URL: PENDING. Preview URL: PENDING. Test totals: PENDING. CI: PENDING. Update-trigger evidence: PENDING. Rollback drill: PENDING. Unfinished criteria/blockers and minimum required human action: PENDING.


## Verified local milestone (2026-10-26, resumed 2026-10-29)

Build succeeded: 26 localized routes plus root redirect and custom 404. Structural suite: 6 passed. Final Chromium browser suite: 23 passed, 0 failed, 0 skipped, 31.575 seconds. Tests visit all 26 localized routes at each of 320/390/768/1440px (104 page/viewport checks), and cover search/filtering, mobile navigation, same-page language switch, tea preselection, bilingual RFQ validation/edit/download/clipboard/recipient-free mailto request, literal hostile input, no HTTP transmission or browser storage, 14 bilingual accessibility scans and local security responses. These are real browser viewport tests on the home laptop, not physical-device tests. Full raw evidence remains in the D-drive checkout's ignored evidence/ and playwright-report/. Compact results: LOCAL_TEST_RESULTS.json.

Cloudflare production, preview, automatic update and rollback still require actual platform evidence. A proposed hostname is not a deployed URL.
