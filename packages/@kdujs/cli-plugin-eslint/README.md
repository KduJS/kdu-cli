# @kdujs/cli-plugin-eslint

> eslint plugin for kdu-cli

## Injected Commands

- **`kdu-cli-service lint`**

  ```
  Usage: kdu-cli-service lint [options] [...files]

  Options:

    --format [formatter] specify formatter (default: stylish)
    --no-fix             do not fix errors
    --max-errors         specify number of errors to make build failed (default: 0)
    --max-warnings       specify number of warnings to make build failed (default: Infinity)
    --output-file        specify file to write report to
  ```

Lints and fixes files. If no specific files are given, it lints all files in `src` and `tests`, as well as all JavaScript files in the root directory (these are most often config files such as `babel.config.js` or `.eslintrc.js`).

Other [ESLint CLI options](https://eslint.org/docs/user-guide/command-line-interface#options) are not supported.

::: tip
`kdu-cli-service lint` will lint dotfiles `.*.js` by default. If you want to follow ESLint's default behavior instead, consider adding a `.eslintignore` file in your project.
:::

## Configuration

ESLint can be configured via `.eslintrc` or the `eslintConfig` field in `package.json`. See the [ESLint configuration docs](https://eslint.org/docs/user-guide/configuring) for more detail.

::: tip
The following option is under the section of [`kdu.config.js`](https://kdujs-cli.web.app/config/#kdu-config-js). It is respected only when `@kdujs/cli-plugin-eslint` is installed.
:::

Lint-on-save during development with `eslint-loader` is enabled by default. It can be disabled with the `lintOnSave` option in `kdu.config.js`:

``` js
module.exports = {
  lintOnSave: false
}
```

When set to `true`, `eslint-loader` will emit lint errors as warnings. By default, warnings are only logged to the terminal and does not fail the compilation.

To make lint errors show up in the browser overlay, you can use `lintOnSave: 'error'`. This will force `eslint-loader` to always emit errors. this also means lint errors will now cause the compilation to fail.

Alternatively, you can configure the overlay to display both warnings and errors:

``` js
// kdu.config.js
module.exports = {
  devServer: {
    overlay: {
      warnings: true,
      errors: true
    }
  }
}
```

When `lintOnSave` is a truthy value, `eslint-loader` will be applied in both development and production. If you want to disable `eslint-loader` during production build, you can use the following config:

``` js
// kdu.config.js
module.exports = {
  lintOnSave: process.env.NODE_ENV !== 'production'
}
```

## Installing in an Already Created Project

```bash
kdu add eslint
```

## Injected webpack-chain Rules

- `config.module.rule('eslint')`
- `config.module.rule('eslint').use('eslint-loader')`
