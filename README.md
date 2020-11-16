# Clair Design

## Prerequirements

[yarn](https://yarnpkg.com/) is required. Just forget `npm run`.

## Before getting started

Check out how to contribute [here](./CONTRIBUTING.md).

## Get Started

### Install

```sh
yarn
```

### Start

```sh
# for vue
yarn start vue
# for react
yarn start react
```

### Preview Site

```shell
# for vue
yarn serve vue
# for react
yarn serve react
```

### ⚠️⚠️⚠️ Commit

Please use `yarn commit` or `npm run commit` instead of `git commit`.

Use `git cz` if you have [commitizen](https://github.com/commitizen/cz-cli) installed globally.

## Lerna

### Run yarn commands

```sh
yarn lerna run --stream build --scope @clair/helpers
# OR
yarn workspace @clair/helpers build
```

### Link packages

```sh
yarn lerna add @clair/theme-default packages/helpers [--dev]
```
