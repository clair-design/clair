# How everything works

## How to write a component

- File an issue, list props table or any API you would like to bring
- Discuss with the maintainer(s), reach to an agreement, and start coding
- Create a corresponding `[component].scss` in `packages/theme-default/styles`, and a `[component].html` in `theme-default/html`
- For further questions, read more details in `theme-default` package
- After finishing the (s)css code, submit a merge/pull request, wait for code review
- After your (s)css code have been merged, create `[component]` folder under `packages/vue/packages`
- Your should at least create `index.js`, `README.md` and `index.spec.js`
  - `index.js`: Export component
  - `README.md`: Document. Your component can be used directly as `<component.name />`
  - `index.spec.js`: Test file. Test is the best way to examine your design(decoupled, modular, testable, based on interface and so on)
- Reexport your component in `src/main.js` as well as `src/esm.js`, the former is for UMD format, and the later is for ESM format
- Submit a merge/pull request, wait for code review
- Viola! Your code have been merged

Similar logic also apply for refactor. The difference is that you may not need to create new files for refactor.

## How to run test in development

```bash
# under root
yarn workspace @clair/vue jest ${component}
# under root/pacakges/vue
yarn jest ${component}
```

## What to test

_DO:_

- UI
  - How component react to props
  - How component react to user interaction
- Functions

_DON'T:_

- Component's data or other internal implementation
  - `component.data`
  - `component.computed`

> A more detailed case would be: test how component update its internal data after some user interaction.

## How to create icon component(s) from existing icon(s)

> By `existing icon`, we mean icons exported by `@clair/icons`.

For the easiest way:

```bash
# under root
yarn workspace @clair/vue icons
# under root/packages/vue
yarn icons
```

However, the above approach may not meet your need. Then you need to write an icon component by yourself.

## How to run e2e test

> So far, we only have screenshot tests.

Basically, what we do is:

- Compile all related sub packages
- Use all compiled code, build the website, aka `packages/sites/site/uxc-vue`
- Serve `packages/sites/site/uxc-vue/dist` on your local machine(with NodeJS)
- Run puppeteer to do the screenshot, and compare to the last results

```bash
# under root
yarn workspace @clair/vue test:e2e
# under root/packages/vue
yarn test:e2e
```

### What if I update the `[component]/README.md`, which create a newer screenshot

Treat it like test ran with `Jest`, provide a `-u`(`--updateSnapshot`) flag:

```bash
# under root
yarn workspace @clair/vue test:e2e -u
# under root/packages/vue
yarn test:e2e -u
```
