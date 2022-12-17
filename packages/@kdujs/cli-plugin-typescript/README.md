# @kdujs/cli-plugin-typescript

> typescript plugin for kdu-cli

Uses TypeScript + `ts-loader` + [fork-ts-checker-webpack-plugin](https://github.com/Realytics/fork-ts-checker-webpack-plugin) for faster off-thread type checking.

## Configuration

TypeScript can be configured via `tsconfig.json`.

This plugin can be used alongside `@kdujs/cli-plugin-babel`. When used with Babel, this plugin will output ES2015 and delegate the rest to Babel for auto polyfill based on browser targets.

## Injected Commands

If opted to use [TSLint](https://palantir.github.io/tslint/) during project creation, `kdu-cli-service lint` will be injected.

## Caching

[cache-loader](https://github.com/webpack-contrib/cache-loader) is enabled by default and cache is stored in `<projectRoot>/node_modules/.cache/ts-loader`.

## Parallelization

[thread-loader](https://github.com/webpack-contrib/thread-loader) is enabled by default when the machine has more than 1 CPU cores. This can be turned off by setting `parallel: false` in `kdu.config.js`.

## Installing in an Already Created Project

``` sh
kdu add typescript
```

## Injected webpack-chain Rules

- `config.rule('ts')`
- `config.rule('ts').use('ts-loader')`
- `config.rule('ts').use('babel-loader')` (when used alongside `@kdujs/cli-plugin-babel`)
- `config.rule('ts').use('cache-loader')`
- `config.plugin('fork-ts-checker')`
