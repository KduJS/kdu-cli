# @kdujs/cli-plugin-eslint

> eslint plugin for kdu-cli

## Injected Commands

- **`kdu-cli-service lint`**

  ```
  Usage: kdu-cli-service lint [options] [...files]

  Options:

    --format [formatter] specify formatter (default: codeframe)
    --no-fix             do not fix errors
    --max-errors         specify number of errors to make build failed (default: 0)
    --max-warnings       specify number of warnings to make build failed (default: Infinity)
  ```

  Lints and fixes files. If no specific files are given, it lints all files in `src` and `test`.

  Other [ESLint CLI options](https://eslint.org/docs/user-guide/command-line-interface#options) are also supported.

## Configuration

ESLint can be configured via `.eslintrc` or the `eslintConfig` field in `package.json`.

Lint-on-save during development with `eslint-loader` is enabled by default. It can be disabled with the `lintOnSave` option in `kdu.config.js`:

``` js
module.exports = {
  lintOnSave: false
}
```

## Installing in an Already Created Project

``` sh
kdu add @kdujs/eslint
```

## Injected webpack-chain Rules

- `config.module.rule('eslint')`
- `config.module.rule('eslint').use('eslint-loader')`
