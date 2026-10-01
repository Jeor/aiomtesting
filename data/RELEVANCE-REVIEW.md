# Supplemental relevance review

This review uses the saved responses from October 1, 2026. No searches were rerun. It is separate from the original headline accuracy score and does not change timings, request counts, or the original results export. Review rules and target IDs are included in `benchmark.json` under `supplemental_review`.

## Rules

- **Aliases:** `Cidade de Deus` targets City of God (2002), IMDb `tt0317248`; `Broen` targets The Bridge (2011), IMDb `tt1733785`. Match by ID, not by a similar title.
- **Harry Potter movies:** coverage of the eight main films. Excludes Fantastic Beasts, concerts and documentaries. Expected IDs: `tt0241527`, `tt0295297`, `tt0304141`, `tt0330373`, `tt0373889`, `tt0417741`, `tt0926084`, `tt1201607`.
- **The Walking Dead shows:** coverage of seven named scripted series: The Walking Dead, Fear the Walking Dead, World Beyond, Tales of the Walking Dead, Dead City, Daryl Dixon and The Ones Who Live. Excludes talk shows and web shorts. This is a defined reference set, not a claim to cover every franchise production. Expected IDs: `tt1520211`, `tt3743822`, `tt10148174`, `tt15669534`, `tt18546730`, `tt13062500`, `tt9859436`.
- **Invented titles:** expect zero returned entries. Report the number of unexpected results without claiming a general false-positive rate.

Alias matching and franchise coverage use the selected position cutoff. No-match controls examine the entire saved response. Franchise counts are unique expected titles, not a judgment that every other returned title is irrelevant. Coverage at top five cannot exceed five even when the reference set has seven or eight titles; choose “Anywhere in returned results” to examine the full saved response.

## Findings from all saved positions

Both invented queries returned no results from all six providers. Five providers found both alias targets; MDBList found neither. IMDb returned two of the eight Harry Potter films and all seven Walking Dead reference series. Other providers returned none of these franchise targets; SIMKL and TMDB returned a John Williams concert for the Harry Potter phrase.

These are two alias cases, two franchise cases and two invented queries per provider. They are too few to establish broad category performance. The original 11 title cases per media type remain the headline scoring denominator.
