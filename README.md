# M2 unit-test map

[Open the interactive map](https://atawfeek.com/m2-unit-test-map/)

A single zoomable map of the Macaulay2 engine unit tests, with component groups,
file dependencies, fixture and template relationships, and mathematical explanations
of 502 test declarations. Select a file to highlight its neighborhood and inspect
its tests. Drag the divider to resize the details sidebar; the width is saved locally.
The map follows your system light/dark preference. LaTeX is rendered locally with KaTeX; no external runtime services are required.

## Source snapshot

- Source: [MichaelABurr/M2, arings at 12ab6ecd492c40dfd53f579bee54b03df36ed495](https://github.com/MichaelABurr/M2/tree/12ab6ecd492c40dfd53f579bee54b03df36ed495/M2/Macaulay2/e/unit-tests).
- Component grouping follows [PR #102](https://github.com/MichaelABurr/M2/pull/102).
- The separate proposed complex-fixture hierarchy follows [PR #104](https://github.com/MichaelABurr/M2/pull/104), head d39cd135754d3cc747ffbf90bde103d1b131892c.
- Snapshot collected October 28, 2026. This is a pinned reference, not a live view of the branch.

The map covers 74 C++ source/header files and 71 include/instantiation connections.
Counts describe source declarations, not the number of executed tests. Disabled
regressions describe intended behavior. The descriptions are a reading aid; the
linked assertions remain authoritative. Generating this map does not run engine tests.

## Edit and rebuild

- `map-page.html`: page layout and interactions.
- `sidebar.js`: accessible, persistent sidebar resizing.
- `map.svg`: the unified dependency map.
- `map-meta.json`: map dimensions and edges.
- `described-data.json`: pinned source inventory and editable LaTeX descriptions.
- `vendor/katex/`: KaTeX 0.16.11, including fonts and its license.

Requires Node.js and Python 3; no dependency installation is needed:

```sh
node render-math.cjs
python3 build-page.py
node --check check.js
```

Commit the updated `index.html` with the sources. GitHub Pages serves the repository
root from `main`; `.nojekyll` keeps this a plain static site. For local viewing, open
`index.html` or run `python3 -m http.server 8000`.

## Attribution and license

Embedded Macaulay2 source retains its original notices. Copyright (C) 1993–2026
The Macaulay2 Authors. Macaulay2 source is licensed under GPL version 2 or later;
see the upstream README and the included `LICENSE`. This guide is distributed under
the same GPL-2.0-or-later terms. KaTeX is MIT-licensed; its notice is included at
`vendor/katex/LICENSE`.
