# Validation repairs — 2026-10-26 (Asia/Shanghai)

1. Initial preview returned 403 because its root path retained a trailing separator. Normalize the root with `path.resolve`; restart the owned preview. Original failed browser JSON preserved locally in `initial-browser-results.json` (ignored).
2. 320/390px home illustration overflowed because `aspect-ratio` combined with `min-height` imposed a larger minimum width. Set `min-width:0;width:100%` and remove the mobile aspect-ratio constraint. All 26 localized pages then passed at all four requested widths.
3. Automated contrast checks found muted text and index labels on pale green backgrounds. Darken muted text and affected labels. All English and Chinese primary page accessibility scans then passed.
4. Extended RFQ verification correctly observed the explicitly clicked `mailto:` handoff. Scope the no-transmission assertion to HTTP requests; separately verify the recipient-free mailto event and truthful status. The app does not send mail.
5. Bound email URI size using encoded length, because Chinese text grows substantially when URL encoded. For long briefs, request that the visitor attach the downloaded text file.

No failing record is represented as a pass. Final totals are recorded separately after the last regression.
