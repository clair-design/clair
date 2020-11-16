# @Clair/icons

Internal icons for Clair-design

## Development

### Add source file(s)

Move new file(s) to `src/svg` and run

```bash
yarn svg
```

### Preview in browser

```bash
yarn dev
```

### Rename existing svg + ts file

There is a chance that the names of existed file(s) might fail to meet your expectation/standard.

To rename both source svg file and ts file, run

```bash
yarn rename
```

> This would update the entry file (`index.ts`) automatically.

## Build

```bash
yarn build
```

## Structure

```txt
- src
  - svg
    - <icon>.svg // source file
- icons
  - <icon>.ts // ts file to export
- index.ts // entry point of the library
- app.jsx // for dev only
- .svgo.yml // config for svgo
- svg.config.js // config for yarn svg, also used for svgo
```

## Organize

Every icon is written and exported in `string` format, which will be then be consumed by `@clair/vue` and `@clair/react`.
