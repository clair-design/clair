# babel-plugin-rewrite-module-path

Babel plugin to rewrite import or export (with `from` keyword) declaration.

By default, it acts to complete the import and export path with file name and extension.

```text
- foo
  - index.js
- entry.js
```

With above directory structure

```js
// in entry.js
import foo from './foo'
export { default } from './foo'

// will be transformed into
import foo from './foo/index.js'
export { default } from './foo/index.js'
```

And for

```text
- foo.js
- entry.js
```

```js
// in entry.js
import foo from './foo'
export { default } from './foo'

// will be transformed into
import foo from './foo.js'
export { default } from './foo.js'
```

## Usage

```js
// in babel.config.js
module.exports = {
  plugins: ['babel-plugin-rewrite-import']
}
```

## Advance

Support user configuration by passing `option` object

```js
// in babel.config.js
module.exports = {
  plugins: [
    [
      'babel-plugin-rewrite-import',
      {
        // this is your option object
      }
    ]
  ]
}
```

### `rewriteImport`

Function that will transform import declaration.

type: `Function`

One parameter will be passed in, which is described as following

```typescript
interface RewriteParameters {
  t: typeof babel.types
  path: NodePath<ImportDeclaration>
  from: string
  fileName: string
  specifiers: {
    imported: string
    local: string
  }[]
  namespace: {
    local: string
  }[]
}
```

> Definition of `NodePath` (referred as `Paths` in the reference) can be found [here](https://github.com/jamiebuilds/babel-handbook/blob/master/translations/en/plugin-handbook.md#toc-paths)

You should use `path` and `t` to do the trick.

[Here are examples of how to use them](https://github.com/jamiebuilds/babel-handbook/blob/master/translations/en/plugin-handbook.md#toc-manipulation)

#### `option.from`

`from` is the `'module'` part of `import a from 'module'`.

#### `option.fileName`

Absolute path of the file that import declaration occur.

### `rewriteExport`

Similar to `rewriteImport`, but to rewrite export declaration with `from` keyword

type: `Function`

One parameter will be passed in, which is described as following

```typescript
interface RewriteExportParameter {
  t: typeof babel.types
  path: NodePath<ExportDeclaration>
  from: string
  fileName: string
  named: {
    exported: string
    local?: string
  }[]
  all: string[]
}
```

> `all` is just an indicator of whether ExportAllDeclaration exist, the content of which is meaningless

### `extensions`

File extensions to be matched and resolved.

type: `string[]`

Default: `['.js', '.jsx', '.ts', '.tsx']`

> Order matter. First match will be used.

## to-do

- [ ] test
- [ ] lint
