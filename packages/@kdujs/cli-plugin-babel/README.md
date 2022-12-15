# @kdujs/cli-plugin-babel

> babel plugin for kdu-cli

## Configuration

Uses Babel 7 + `babel-loader` + [@kdujs/babel-preset-app](https://github.com/kdujs/kdu-cli/tree/main/packages/%40kdujs/babel-preset-app) by default, but can be configured via `babel.config.js` to use any other Babel presets or plugins.

By default, `babel-loader` excludes files inside `node_modules` dependencies. If you wish to explicitly transpile a dependency module, you will need to add it to the `transpileDependencies` option in `kdu.config.js`:

``` js
module.exports = {
  transpileDependencies: [
    // can be string or regex
    'my-dep',
    /other-dep/
  ]
}
```

## Caching

[cache-loader](https://github.com/webpack-contrib/cache-loader) is enabled by default and cache is stored in `<projectRoot>/node_modules/.cache/babel-loader`.

## Parallelization

[thread-loader](https://github.com/webpack-contrib/thread-loader) is enabled by default when the machine has more than 1 CPU cores. This can be turned off by setting `parallel: false` in `kdu.config.js`.

## Installing in an Already Created Project

``` sh
kdu add @kdujs/babel
```

## Injected webpack-chain Rules

- `config.rule('js')`
- `config.rule('js').use('babel-loader')`
- `config.rule('js').use('cache-loader')`
