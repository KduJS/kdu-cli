# @kdujs/babel-preset-app

This is the default Babel preset used in all Kdu CLI projects. **Note: this preset is meant to be used exclusively in projects created via Kdu CLI and does not consider external use cases.**

## Options

### modules

- Default:
  - `false` when building with webpack
  - `'commonjs'` when running tests in Jest.

Explicitly set `modules` option for `babel-preset-env`. See [babel-preset-env docs](https://github.com/babel/babel/tree/master/packages/babel-preset-env#modules) for more details.

### targets

- Default:
  - determined from `browserslist` field in `package.json` when building for browsers
  - set to `{ node: 'current' }` when running unit tests in Node.js

Explicitly set `targets` option for `babel-preset-env`. See [babel-preset-env docs](https://github.com/babel/babel/tree/master/packages/babel-preset-env#targets) for more details.

### useBuiltIns

- Default: `'usage'`
- Allowed values: `'usage' | 'entry' | false`

Explicitly set `useBuiltIns` option for `babel-preset-env`.

The default value is `'usage'`, which adds imports to polyfills based on the usage in transpiled code. For example, if you use `Object.assign` in your code, the corresponding polyfill will be auto-imported if your target environment does not supports it.

Note that the usage detection does not apply to your dependencies (which are excluded by `cli-plugin-babel` by default). If one of your dependencies need polyfills, you have a few options:

1. **If the dependency is written in an ES version that your target environments do not support:** Add that dependency to the `transpileDependencies` option in `kdu.config.js`. This would enable both syntax transforms and usage-based polyfill detection for that dependency.

2. **If the dependency ships ES5 code and explicitly lists the polyfills needed:** you can pre-include the needed polyfills using the [polyfills](#polyfills) option for this preset.

3. **If the dependency ships ES5 code, but uses ES6+ features without explicitly listing polyfill requirements (e.g. Kdutify):** Use `useBuiltIns: 'entry'` and then add `import '@babel/polyfill'` to your entry file. This will import **ALL** polyfills based on your `browserslist` targets so that you don't need to worry about dependency polyfills anymore, but will likely increase your final bundle size with some unused polyfills.

See [@babel/preset-env docs](https://new.babeljs.io/docs/en/next/babel-preset-env.html#usebuiltins-usage) for more details.

### polyfills

- Default: `['es6.array.iterator', 'es6.promise', 'es7.promise.finally']`

A list of [core-js](https://github.com/zloirock/core-js) polyfills to pre-include when using `useBuiltIns: 'usage'`. **These polyfills are automatically excluded if they are not needed for your target environments**.

Use this option when you have 3rd party dependencies that are not processed by Babel but have specific polyfill requirements (e.g. Axios and Kdux require Promise support).

### jsx

- Default: `true`.

Set to `false` to disable JSX support.

### loose

- Default: `false`.

Setting this to `true` will generate code that is more performant but less spec-compliant.
