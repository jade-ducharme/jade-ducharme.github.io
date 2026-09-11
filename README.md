# jade-ducharme.github.io

Personal academic site for **Jade Marie Ducharme** — Ph.D. candidate in physics at Brown
University (radio interferometry, 21-cm cosmology, RFI mitigation).

Live at **https://jade-ducharme.github.io/**. Built with [Gatsby 5][gatsby], deployed to GitHub
Pages. Originally based on Brittany Chiang's `v4` portfolio template, re-themed as an academic
site.

[gatsby]: https://www.gatsbyjs.com/

## Running it locally

Node must be **>=18 <26** (Gatsby 5's `engines`). `.nvmrc` pins 24.

```sh
nvm use          # or otherwise select Node 24
yarn install
yarn develop     # http://localhost:8000
```

| Command        | What                                        |
| -------------- | ------------------------------------------- |
| `yarn develop` | dev server with hot reload (localhost:8000) |
| `yarn build`   | production build into `public/`             |
| `yarn serve`   | serve the production build (localhost:9000) |
| `yarn clean`   | clear `.cache/` and `public/`               |
| `yarn deploy`  | build and publish to the `gh-pages` branch  |

Package manager is **yarn classic** — don't mix in npm.

## Publishing to GitHub Pages

Two branches, two jobs:

| Branch     | Holds                      | Written by                   |
| ---------- | -------------------------- | ---------------------------- |
| `main`     | the source code            | you, via pull request        |
| `gh-pages` | the built site (`public/`) | `yarn deploy`, automatically |

**One-time setup** — in the repo's **Settings → Pages**, set _Source_ to **Deploy from a branch**,
then pick the **`gh-pages`** branch and the **`/ (root)`** folder. Save.

**Every time you want to publish:**

```sh
git checkout main
git pull
yarn deploy
```

`yarn deploy` runs a production build and force-pushes `public/` to `gh-pages`. GitHub Pages
picks it up within a minute or two. Nothing you merge into `main` is touched.

Merging a pull request into `main` does **not** publish anything on its own — the site only
changes when someone runs `yarn deploy`. If you'd rather have merges publish automatically, that
takes a GitHub Actions workflow and switching _Source_ to **GitHub Actions**.

> **Never point `yarn deploy` at `main`.** It force-pushes, so it would overwrite the source with
> built output. That's why the deploy branch is separate.

## Editing content

Everything on the page comes from markdown in `content/` — **the folder decides which section a
file lands in**, so adding a file to the right folder is all that's needed.

| Folder                  | Renders as                                    |
| ----------------------- | --------------------------------------------- |
| `content/hero/`         | the header (name, tagline, portrait)          |
| `content/about/`        | About Me                                      |
| `content/jobs/<Name>/`  | Research & Experience tabs                    |
| `content/projects/*.md` | Publications, split by the `authorship` field |
| `content/talks/*.md`    | the Talks & Outreach table                    |
| `content/photos/`       | photos in Talks & Outreach                    |
| `content/contact/`      | Contact                                       |

Honors & Awards and Professional Development are arrays at the top of
`src/components/sections/talks.js` — they don't fit the table shape.

The CV lives at `static/cv.pdf` and is served at `/cv.pdf`; replacing that file updates the CV
link in the nav.

Photos should be **compressed before committing** (~1400px on the long edge, JPEG quality ~82).
Gatsby generates responsive sizes at build time, but the original still lands in git history.

## Regenerating images

```sh
node scripts/generate-og.js       # src/images/og.png — the social preview card
node scripts/generate-favicon.js  # the favicon, from src/images/galaxy.png
```

Both hardcode the accent colour, so re-run them if the palette in `src/styles/theme.js` changes.

## Checks

```sh
npx eslint .
npx prettier --check "src/**/*.js" "gatsby-*.js" "*.config.js" "scripts/*.js"
```

A husky `pre-commit` hook runs prettier and eslint on staged files.
