# @clair/babel-plugin-inject-style

When import a given component, import its corresponding style file automatically.

## Installation

```bash
npm i -D @clair/babel-plugin-inject-style
# or
yarn add -D @clair/babel-plugin-inject-style
```

## Usage

In your `babel-config.js` or `.babelrc`

```js
module.exports = {
  plugins: ['@clair/inject-style'] // or '@clair/babel-plugin-inject-style'
}
```

## Options

By default, it is designed to be used with `@clair/vue` and `@clair/react`.

But certain flexibility can be achieved by `options`

### packageName

Default: `'@clair/vue`.

To specify which UI library to target.

```js
module.exports = {
  plugins: [
    [
      '@clair/inject-style',
      {
        packageName: 'yourUILibrary'
      }
    ]
  ]
}
```

### stylePackageName

Default: `'@clair/theme-default'`

If the style files are released under another package, this would become handy.

Support you want to import `Button` with pure JavaScript and load its style automatically, then you can

```js
module.exports = {
  plugins: [
    '@clair/inject-style',
    {
      packageName: 'yourUILibrary',
      stylePackageName: 'yourDesignatedStyleLibrary'
    }
  ]
}
```

**There is a path matching pattern underneath**

```js
const stylePath = `${stylePackageName}/styles/${computedComponentName}${extension}`
```

This may not be what you want. Then try [getStylePath](###getStylePath).

### getStylePath

> You can only pass function in `babel.config.js`.

To maximize the flexibility to compute your own style path, you can

```js
module.exports = {
  plugins: [
    '@clair/inject-style',
    {
      packageName: 'yourUILibrary',
      getStylePath(componentName) {
        return computeStylePath(componentName)
      }
    }
  ]
}
```

`getStylePath` accept one parameter `componentName`.

It is name of the `imported` named import or the default import.

For example, in case like `import { a as b } from 'libaray'`, `a` is the `componentName` here.

> By using this, `stylePackageName` and `extension` will be ignored.

### extension

Default: `'.scss'`.

The extension of style files. You can change it to anything you want.

> It will be ignored if you are using `getStylePath`.

## TODO

- [ ] test
