# Lumiere DB build 0702a05 — repeat comparison

The same 14 movie and 14 show queries were rerun on October 1, 2026, through AIOMetadata 3.3.2’s full Stremio search route, including metadata enrichment. The original observations are preserved. No other provider was rerun.

## Version evidence

- **Updated Lumiere:** image revision `0702a05027889395feee1905eae1a879a34acdf1`, created `2026-10-01T20:18:43.750Z`. Container image digest is recorded in [versions.json](versions.json).
- **Image tag:** `latest`, which is mutable and is not a reliable version identifier on its own.
- **Original Lumiere build:** unrecorded. No retrospective version claim is made.
- **Database snapshot:** unrecorded for both runs. The image revision identifies the running application build, not necessarily its imported IMDb dataset.
- **AIOMetadata:** the exact same image digest as the original test; version 3.3.2. Both production and Lumiere image IDs were checked before and after the rerun.

Public source revision: [Lumiere DB 0702a05](https://github.com/0xConstant1/lumiere-db/commit/0702a05027889395feee1905eae1a879a34acdf1).

## Results

The following uses the original top-five scoring definition: 11 scored title queries per media type. Medians and HTTP counts cover all 14 queries per type.

| Media | Original found | Updated found | Original median | Updated median | Original HTTP attempts | Updated HTTP attempts |
|---|---:|---:|---:|---:|---:|---:|
| Movies | 11/11 | 11/11 | 85 ms | 94 ms | 73 | 73 |
| Shows | 9/11 | 11/11 | 76 ms | 113 ms | 57 | 67 |

`Dark 2017` and `Doctor Who (1963)` previously returned no entries; both now return the intended title at rank one. All 22 scored title queries now find the target at rank one. This is a small sample, not a universal success-rate claim.

## Execution and limitations

- Four matching pilot queries, followed by the original 28 queries in the same order for Lumiere.
- A temporary AIOMetadata copy used isolated Redis and cloned current metadata seeds/configuration. Production settings and caches were not cleared. Test warming/sync schedules were disabled.
- All 28 responses succeeded and executed provider-lookup stages. No measured downstream HTTP errors occurred.
- 204 outbound HTTP attempts total: 140 during main searches, 46 during pilots, and 18 startup/background attempts. These include metadata work, not just Lumiere search requests. A 400-attempt safety cap was not reached.
- This rerun ran in one process. The original final three queries followed a coordinated restart. The new run also followed a later cache snapshot and different request timing; it was not interleaved with the other providers.
- Fresh isolated search caches do not imply fully cold metadata caches. The timing changes cannot be attributed solely to the new Lumiere build. No repeated timing trials or controlled feature ablations were performed.
- Supplemental alias/franchise/no-match rules are unchanged. They remain excluded from headline accuracy.

## Downloads

- [All detailed rerun observations](results.json)
- [Lumiere query CSV](queries.csv)
- [Six-provider comparison CSV with updated Lumiere](comparison-queries.csv)
- [Summary CSV](summary.csv)
- [Version metadata](versions.json)

Only sanitized test observations and version evidence are published. No configuration, account identifiers, service addresses or credentials are included.
