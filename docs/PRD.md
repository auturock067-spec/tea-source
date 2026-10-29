# PENG Tea Sourcing V0.1 — Product Requirements

Status: implementation baseline; acceptance evidence pending. Updated 2026-10-26.

## Goal

Launch an English-first, Chinese-switchable Chinese-tea procurement information site that helps a small business understand its options and prepare a useful sourcing brief. The release is complete only after real browser acceptance, GitHub versioning/CI and a verified HTTPS Cloudflare Pages production deployment.

Repository: https://github.com/auturock067-spec/tea-source. Public identity: **PENG Tea Sourcing**, provisional and not trademark-cleared. No affiliation with TeaSource or teasource.com.

## Audience and jobs

- Primary: US independent tea brands, specialty retailers and hospitality buyers evaluating small commercial purchases.
- Secondary: UK, Canada, Australia and EU buyers needing destination-specific starting points.
- Main job: “Help me decide what to ask for and produce a clear request before approaching a supplier.”
- Buyer pain hypotheses: unclear minimums, sample-to-bulk consistency, incomplete quotes, packaging constraints and destination evidence. These are research inferences, not validated customer interviews; see RESEARCH.md.

## Core user journeys

| Journey | Steps | Observable outcome |
|---|---|---|
| Discover a tea | Home → Tea Library → search/filter → category detail → RFQ | Matching category is preselected in the RFQ. |
| Understand origin | Tea Regions → compare representative origins → library/detail | Buyer sees practical specification questions and source links. |
| Prepare import questions | Sourcing Guide → Quality & Compliance → market references | US/EU/GB/CA/AU checkpoints have authoritative links and limitations. |
| Build a brief | Fill required fields → acknowledge local-only behavior → Generate → review/edit → copy/download/email draft | Complete brief; explicit “not submitted”; no background transmission. |
| Change language | English page → 中文 or Chinese page → EN | Equivalent localized route opens; tea query preference is retained where applicable. |

## Required pages

Thirteen routes per language: Home, Tea Library, Tea Regions, Sourcing Guide, Quality & Compliance, Request Sourcing, Privacy, and six category details. Category groups: green, black, oolong, white, Pu-erh/dark and jasmine. These are **sourcing groups**, not the traditional six processing categories. Root directs to English; unknown paths receive a real 404 page.

Every category detail explains representative origins, process/style, buying questions, sample considerations and a next action. No stock, price, verified supplier, customer, certification or laboratory-result claims are invented.

## Interaction requirements

- Search and category filters work together, show a result count and an empty state, and preserve useful keyboard operation.
- Mobile menu exposes its expanded state and closes with Escape. Navigation, skip link and language switch remain usable at 320 px.
- RFQ includes category, target market, specifications/intended use, positive quantity in kg, packaging, delivery/sample/packing requirements, quality/document requirements, buyer email and optional company/project.
- Required fields and acknowledgement validate before generation. Reject whitespace-only required descriptions and malformed email. User-entered text is rendered as text, never executable HTML.
- Generated brief remains editable. Copy provides success only after clipboard completion; denied clipboard access provides a manual-copy fallback. Download creates a UTF-8 text file. Email draft has no preset recipient and requires the visitor to review and send it. Long briefs use a clear attach-file instruction.
- No receiving inbox is connected. No “submitted”, “we received your request” or supplier-response promise is permitted.

## Interface and content direction

Professional editorial presentation: forest green, warm paper background, readable typography, generous space, original tea-landscape vector artwork and clear page hierarchy. Use concise English, complete Simplified Chinese equivalents, useful buying details and restrained calls to action. Pages must work without external fonts or embedded media; main educational content is rendered HTML.

## Quality requirements

Acceptance matrix is in ACCEPTANCE.md. Release targets: 26 localized pages; no broken internal links; correct titles, descriptions, canonical and alternate-language links; sitemap and robots; no horizontal overflow at 320/390/768/1440; no serious browser errors; no critical/serious automated accessibility violations in the tested scope; RFQ complete in both languages. Production headers and actual HTTPS behavior must be checked separately from local tests.

## Scope and constraints

Free static hosting and no paid AI/API/database. No account system, checkout, order placement, supplier directory, automatic email, CRM, analytics or persistent RFQ storage. These require a separately scoped future decision. Keep installations/cache on D where practical and touch only this repository. GitHub is the cross-device source of truth.

## Main risks and mitigations

| Risk | Mitigation / release rule |
|---|---|
| Brand confusion | Provisional public name, explicit independence, configurable identity; no trademark-clearance claim. |
| Outdated compliance | Official links, review date, qualified language, monthly review; no legal-adviser claim. |
| False commercial trust | Educational catalog only; no invented supplier, price, testing or certification badges. |
| Buyer expects contact | Repeat local-only notice before and after generation; no fabricated inbox. |
| Cross-device overwrite | Fetch/status/fast-forward workflow; preserve divergent work and use PRs. |
| Deploy/CI unavailable | Record exact blocker and pending checks; never equate a local build with production. |

## Success and follow-up

V0.1 success is functional and verifiable delivery, not a fabricated revenue or conversion claim. Later evaluation can use voluntary buyer feedback about brief usefulness. A genuine contact channel, approved supplier evidence and complete brand clearance are prerequisites for expanding into a commercial sourcing service.
