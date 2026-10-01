# AIOMetadata Search Lab

An independent, interactive comparison of search providers inside AIOMetadata.

**[Open the comparison →](https://jeor.github.io/aiomtesting/)**

This exploratory run contains 168 searches: the same 14 movie and 14 show queries across SIMKL, TVDB, TMDB, IMDb, Lumiere DB, and MDBList. Timings include normal metadata enrichment; they are not standalone provider API benchmarks or Odin rendering measurements.

## Read the evidence

- [Full report and limitations](data/REPORT.md)
- [Summary CSV](data/summary.csv)
- [Query CSV](data/queries.csv)
- [Detailed results and request ledger](data/results.json)
- [Execution manifest](data/execution-manifest.json)

The site supports media/category filters, top-1/5/10 and any-returned-position scoring, timing comparisons with and without empty responses, category heatmaps, individual timing distributions, metadata field coverage, request-service breakdowns, and individual-query inspection. Filters are saved in the URL for sharing. Alias, franchise, and negative queries are visible but excluded from headline title accuracy because their relevance labels need review. Unmapped native identifiers are flagged.

## Run locally

No build step or dependencies are required:

```sh
python3 -m http.server 8767
```

Open http://localhost:8767. GitHub Pages serves the root of `main`.

## Interpretation

This is one balanced block, not the full proposed 1,680-search corpus. Caches were isolated by provider and evolved normally. No trailer feature ablation was run. Stage timings overlap and cannot be subtracted to infer a trailers-off or enrichment-off response time. Do not use these small samples to claim a universal winner.

AIOMetadata is created by [cedya77](https://github.com/cedya77/aiometadata). This is an independent community test, not an official benchmark.

The timing selector also offers a common-success subset: the same queries where every provider found the target at the chosen cutoff. This is a matched descriptive comparison, but excludes harder queries that some providers missed. Any-position scoring checks only the saved first response, whose result limit differs by provider.

Chart bars, category cells, request segments, field percentages and timing dots open accessible detail dialogs. Query drill-downs retain a back link to the selected chart data. Technical request and field panels are collapsed by default; filter scope is stated next to each comparison.
