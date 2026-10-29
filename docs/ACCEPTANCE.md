# V0.1 Acceptance Matrix

Baseline 2026-10-26. Results updated 2026-10-29 from actual local tests, browser review and GitHub CI. Cloudflare deployment gates remain blocked by account verification.

## Release gate

V0.1 is accepted only when content/function checks, local build, required browser flows, GitHub code/CI and actual HTTPS production verification pass. Explicitly list any remaining blocker or scoped limitation. Do not describe a planned URL or local-only build as launched.

| ID | Criterion | Measurable check | Observed result |
|---|---|---|---|
| C01 | Complete information architecture | 26 localized content pages: 13 EN + 13 ZH; root entry and 404; six category details in each language. | PASS — local/source evidence below |
| C02 | Useful source-backed content | Home, Library, Regions, Guide, Compliance and RFQ present; official references for material tea/compliance claims; review date recorded. | PASS — local/source evidence below |
| C03 | Truthful commercial status | No invented suppliers, stock, certifications, prices, tests, customers or service commitments; provisional identity/independence stated. | PASS — local/source evidence below |
| C04 | Bilingual parity | Equivalent route/language metadata; terminology, market caveats and no-submission notices agree in both languages. | PASS — local/source evidence below |
| F01 | Search/filter | Known tea/origin query returns matching cards; combined category filter works; impossible query shows empty state; reset restores six. | PASS — local/source evidence below |
| F02 | Navigation | Every internal anchor and asset resolves; mobile menu expands/collapses; Escape closes/focuses trigger; language switch opens equivalent page. | PASS — local/source evidence below |
| F03 | Category handoff | Each of six detail RFQ actions preselects its category; unknown query value does not inject markup or select invalid data. | PASS — local/source evidence below |
| F04 | RFQ invalid inputs | Empty required fields, whitespace descriptions, invalid email, missing acknowledgement and quantity outside allowed range cannot generate a brief. | PASS — local/source evidence below |
| F05 | RFQ valid flow | Complete both EN/ZH forms; output contains all selected/entered requirements and explicit not-submitted status; edit preserves current form fields. | PASS — local/source evidence below |
| F06 | Export | Download produces readable UTF-8 .txt containing current edited brief; clipboard copy matches; blocked clipboard has manual fallback. | PASS — local/source evidence below |
| F07 | Email handoff | Mailto has no preset recipient; encoded subject/body correspond to brief or long-brief attachment guidance; UI says visitor must review/send. No actual email is sent in testing. | PASS — local/source evidence below |
| Q01 | Build | Locked dependencies install; production build exits 0 and produces expected files; no secrets bundled. | PASS — local/source evidence below |
| Q02 | Structural tests | Node test suite exits 0; preserve command output, counts and commit in evidence. | PASS — local/source evidence below |
| Q03 | Responsive browser matrix | At 320/390/768/1440 px, all 26 localized pages have document scroll width <= viewport width (+1 px tolerance); text/actions remain usable. | PASS — local/source evidence below |
| Q04 | Real visual review | Inspect representative home, library/detail, compliance and RFQ screenshots on phone and desktop; no obscured controls, clipping or unreadable overlap. | PASS — local/source evidence below |
| Q05 | JavaScript health | Zero uncaught page errors, serious console/CSP failures or unexpected failed same-origin requests in tested core flows. | PASS — local/source evidence below |
| Q06 | Accessibility | Semantic labels/landmarks/H1, keyboard navigation and visible focus; automated critical/serious violation count 0 for tested pages/states; document tool/scope. | PASS — local/source evidence below |
| S01 | SEO | Unique localized title/description; valid canonical and EN/zh-Hans/x-default alternates; correct lang; robots/sitemap valid; correct production origin. | LOCAL PASS; production origin not yet verified |
| S02 | Safe input/privacy | Hostile RFQ strings remain literal; no form fetch/POST or RFQ browser storage; export only on click; external links safe. | PASS — local/source evidence below |
| S03 | Hosted security | Actual production responses contain CSP, nosniff, framing/referrer/device restrictions; HTTPS valid; no mixed content. | BLOCKED — GitHub owner verification |
| G01 | Repository | Only tea-source changed; actual pushed commit, reviewed diff, PR where applicable and clean/safely documented checkout status. | PASS — local/source evidence below |
| G02 | CI | Real GitHub workflow run tied to release commit succeeds; link saved. Workflow presence alone is insufficient. | PASS — local/source evidence below |
| D01 | Pages Git integration | Cloudflare project references exact repo/main/build/output; preview branch deployment verified with actual URL/commit. | BLOCKED — GitHub owner verification |
| D02 | Production | Real HTTPS production URL serves correct release; localized routes, links, RFQ and 404 smoke-tested; build-info commit matches. | BLOCKED — GitHub owner verification |
| D03 | Automatic update | A subsequent repository push produces a new observed Pages deployment; served commit identity changes accordingly. | BLOCKED — GitHub owner verification |
| D04 | Recovery | Official rollback path recorded; first-deployment absence of target acknowledged; actual drill/result recorded if performed. | DOCUMENTED ONLY — no deployment/rollback drill |

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

Overall status: **PROJECT INCOMPLETE — deployment blocked**. Application commit: `b126f2564723f78926a33b03d5a9f3d2cbdd034f` (PR #1 merged). Local tests: 6 structural + 26 browser tests passed, 0 failed; compact results in LOCAL_TEST_RESULTS.json. Main application CI: https://github.com/auturock067-spec/tea-source/actions/runs/40892747473 (success). Production URL: **none verified**. Preview deployment: **none created**. Automatic update and rollback: not executed.

Minimum human-only action: complete GitHub owner verification on the Cloudflare installation update page so the already-approved addition of tea-source can be saved. The owner reported being unable to verify on 2026-10-29. No account credential was requested in chat; no paid service or alternate project was created. Resume by checking the saved repository selection, then connect this repository in Pages using DEPLOYMENT.md.


## Verified local milestone (2026-10-26, resumed 2026-10-29)

Build succeeded: 26 localized routes plus root redirect and custom 404. Structural suite: 6 passed. Final Chromium browser suite: 23 passed, 0 failed, 0 skipped, 31.575 seconds. Tests visit all 26 localized routes at each of 320/390/768/1440px (104 page/viewport checks), and cover search/filtering, mobile navigation, same-page language switch, tea preselection, bilingual RFQ validation/edit/download/clipboard/recipient-free mailto request, literal hostile input, no HTTP transmission or browser storage, 14 bilingual accessibility scans and local security responses. These are real browser viewport tests on the home laptop, not physical-device tests. Full raw evidence remains in the D-drive checkout's ignored evidence/ and playwright-report/. Compact results: LOCAL_TEST_RESULTS.json.

Cloudflare production, preview, automatic update and rollback still require actual platform evidence. A proposed hostname is not a deployed URL.

## Final local regression — 2026-10-29

26/26 Chromium tests passed in 35.2 seconds; 6/6 structural checks passed. The added cases cover all six category handoffs, invalid category query strings, missing acknowledgement, whitespace-only descriptions, minimum/maximum quantity rejection, edited export content and the denied-clipboard manual-copy fallback. Real browser visual review inspected desktop home/compliance and mobile library/detail/RFQ at the requested viewport sizes; no clipping or obscured controls was observed. Physical phones and other browser engines were not tested.
