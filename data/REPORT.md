# AIOMetadata search comparison — October 1, 2026

## Scope

This is a completed, bounded exploratory run: **168 comparison searches**, using the same 14 movie and 14 show queries on each of six providers. Trakt was excluded. It is the first balanced block of the proposed 1,680-search corpus, not the full benchmark. Small category samples are useful for finding differences, but do not establish a universal winner.

Requests went through AIOMetadata’s normal Stremio catalog search route, including metadata enrichment under the copied configuration. These timings do not measure Odin rendering or the Jellyfin search route.

## Results

“Found” means the expected title appeared in the first five returned results. The denominator is **11 title queries per media type**; alias, franchise, and negative queries remain exploratory and are excluded from that score. Median response times and HTTP-attempt counts cover all 14 queries per media type, including empty results. A fast empty response is not a successful search.

| Provider | Movies found | Movie median | Movie HTTP attempts | Shows found | Show median | Show HTTP attempts |
|---|---:|---:|---:|---:|---:|---:|
| SIMKL | 8/11 | 243 ms | 40 | 9/11 | 208 ms | 37 |
| TVDB | 9/11 | 399 ms | 134 | 8/11* | 490 ms | 104 |
| TMDB | 7/11 | 103 ms | 56 | 8/11 | 99 ms | 47 |
| IMDb | 10/11 | 778 ms | 149 | 11/11 | 576 ms | 73 |
| Lumiere DB | 11/11 | 85 ms | 73 | 9/11 | 76 ms | 57 |
| MDBList | 4/11 | 221 ms | 20 | 5/11 | 142 ms | 19 |

*TVDB has two show cases containing unmapped native IDs in the first five results. Its 8/11 is a confirmed-hit lower bound, not a fully adjudicated score.

Lumiere found all 11 scored movie targets at rank one in this sample. IMDb found all 11 scored show targets in the top five. IMDb and TVDB also made more downstream requests. These results describe the AIOMetadata integration and this configuration, not just the providers’ standalone search APIs.

## Differences worth investigating

- **Typos:** SIMKL, TMDB, and MDBList missed both movie and both show typo cases in this block. Inspect individual queries before generalizing to all misspellings.
- **Years in queries:** Lumiere missed `Dark 2017` and `Doctor Who (1963)`. TMDB missed both tested year formats for `Blade Runner 2049`, plus `Dark 2017`.
- **Ranking:** SIMKL placed the expected `Moon` at rank 9; MDBList placed it at rank 6. TVDB placed the expected `City of God` at rank 7. These are ranking misses at five, not missing titles.
- **Abbreviations:** IMDb missed `LOTR` in this sample; its otherwise strong title score should not be interpreted as universal abbreviation support.
- **Enrichment errors:** Two downstream TMDB requests returned 404: during SIMKL’s `SVU` and TVDB’s `Coherence` searches. All 168 catalog requests still returned HTTP 200; no measured request was budget-aborted.
- **Trailers:** No returned trailer entries or addon-trailer calls were observed. This run cannot establish a trailers-on/off speed difference.

## Conditions and fairness

- AIOMetadata **3.3.2**, using the same deployed image for all providers. Movie metadata used TMDB; series and anime metadata used TVDB. Language was en-US. Normal copied filters/enrichment settings were retained.
- Each provider had a separate Redis database and cloned data. Static mappings and database seeds were equal; each valid provider setup received the same four-query pilot.
- All 168 main searches executed provider lookup stages, and the outer search cache reported computation/refresh. Enrichment caches evolved normally after the pilot and earlier queries. **These are fresh-query searches, not fully cold searches.**
- Queries were interleaved across providers by the runner. This is one pass, not repeated latency sampling. External load and request order can affect results.
- A provisional per-provider cap paused the run after 25 cases per provider. Budgets were redistributed without raising the overall budget; all six test apps restarted with disk/Redis retained. The final three cases per provider belong to the `after-budget-rebalance-restart` cohort. Compare cohorts separately when examining in-memory-cache effects.
- Scheduled warming, tracker syncing, and unrelated maintenance startup tasks were disabled only in test copies, to avoid side effects and competition. Production remained running.

## Request accounting

The isolated run recorded **1,295 outbound HTTP attempts**: 809 attributed to main searches, 252 to pilot/setup searches, 36 to parity validation, and 198 to unattributed startup/background work. These include enrichment and dataset checks; they are not all billed search-provider API calls. No monetary cost is inferred.

There were 204 isolated catalog-search attempts: 168 main, 24 original pilot, four corrected IMDb pilot retries, and eight parity requests. The original four IMDb pilot attempts used an incorrect test provider ID and are excluded from quality comparisons. The main run used the corrected supported ID. Four earlier live feasibility searches are separate and are not included in this isolated-run ledger.

## Validation and measurement limits

Four Lumiere responses (two warm queries and two new queries) had identical complete-response SHA-256 hashes with and without the stage wrappers. This supports response preservation for those cases; it does not prove zero timing overhead or validate every provider adapter.

The dataset includes query-level responses, result IDs/ranks, observed cache outcomes, outbound services/statuses, and stage spans. Provider helper snapshots can already be normalized or filtered; they are not guaranteed raw upstream rankings. Stage intervals overlap: **do not subtract or add them to claim a feature-disabled response time**. Ratings/artwork coverage is incomplete, and true feature ablations were not run. Clock IDs distinguish process restarts; timestamps cannot be aligned across processes as wall-clock events.

No p95 headline or overall winner is reported with this sample size. More balanced blocks, reviewed alias/franchise relevance, and repeated timing trials would be needed for a strong public ranking.

## Files

- [Summary CSV](summary.csv): provider/media aggregates.
- [Query CSV](queries.csv): individual searches and scores.
- [Structured results](results.json): detailed observations, spans, outbound ledger, and limitations for a future interactive report.
- [Execution manifest](execution-manifest.json): scope and hashes.

The report and exported traces omit account URLs, request credentials, and raw provider headers. An interactive presentation of this dataset is available at [AIOMetadata Search Lab](https://jeor.github.io/aiomtesting/).

## Supplemental category review

[Read the subsequent relevance review](RELEVANCE-REVIEW.md) for alias, franchise and invented-query outcomes from these same saved responses. These separate outcomes do not change the original headline scores above.
