# Build Targets

When you run `kdu-cli-service build`, you can specify different build targets via the `--target` option. This allows you to use the same code base to produce different builds for different use cases.

## App

App is the default build target. In this mode:

- `index.html` with asset and resource hints injection
- vendor libraries split into a separate chunk for better caching
- static assets under 8KiB are inlined into JavaScript
- static assets in `public` are copied into output directory

## Library

::: tip Note on Kdu Dependency
In lib mode, Kdu is *externalized*. This means the bundle will not bundle Kdu even if your code imports Kdu. If the lib is used via a bundler, it will attempt to load Kdu as a dependency through the bundler; otherwise, it falls back to a global `Kdu` variable.

To avoid this behavior provide `--inline-kdu` flag to `build` command.

```
kdu-cli-service build --target lib --inline-kdu
```
:::

You can build a single entry as a library using

```
kdu-cli-service build --target lib --name myLib [entry]
```

```
File                     Size                     Gzipped

dist/myLib.umd.min.js    13.28 kb                 8.42 kb
dist/myLib.umd.js        20.95 kb                 10.22 kb
dist/myLib.common.js     20.57 kb                 10.09 kb
dist/myLib.css           0.33 kb                  0.23 kb
```

The entry can be either a `.js` or a `.kdu` file. If no entry is specified, `src/App.kdu` will be used.

A lib build outputs:

- `dist/myLib.common.js`: A CommonJS bundle for consuming via bundlers (unfortunately, webpack currently does not support ES modules output format for bundles yet)

- `dist/myLib.umd.js`: A UMD bundle for consuming directly in browsers or with AMD loaders

- `dist/myLib.umd.min.js`: Minified version of the UMD build.

- `dist/myLib.css`: Extracted CSS file (can be forced into inlined by setting `css: { extract: false }` in `kdu.config.js`)

::: warning
If you are developing a library or in a monorepo, please be aware that CSS imports **are side effects**. Make sure to **remove** `"sideEffects": false` in the `package.json`, otherwise CSS chunks will be dropped by webpack in production builds.
:::

### Kdu vs. JS/TS Entry Files

When using a `.kdu` file as entry, your library will directly expose the Kdu component itself, because the component is always the default export.

However, when you are using a `.js` or `.ts` file as your entry, it may contain named exports, so your library will be exposed as a Module. This means the default export of your library must be accessed as `window.yourLib.default` in UMD builds, or as `const myLib = require('mylib').default` in CommonJS builds. If you don't have any named exports and wish to directly expose the default export, you can use the following webpack configuration in `kdu.config.js`:

``` js
module.exports = {
  configureWebpack: {
    output: {
      libraryExport: 'default'
    }
  }
}
```

## Web Component

::: tip Note on Compatibility
Web Component mode does not support IE11 and below.
:::

::: tip Note on Kdu Dependency
In web component mode, Kdu is *externalized.* This means the bundle will not bundle Kdu even if your code imports Kdu. The bundle will assume `Kdu` is available on the host page as a global variable.

To avoid this behavior provide `--inline-kdu` flag to `build` command.

```
kdu-cli-service build --target wc --inline-kdu
```
:::

You can build a single entry as a web component using

```
kdu-cli-service build --target wc --name my-element [entry]
```

Note that the entry should be a `*.kdu` file. Kdu CLI will automatically wrap and register the component as a Web Component for you, and there's no need to do this yourself in `main.js`. You can use `main.js` as a demo app solely for development.

The build will produce a single JavaScript file (and its minified version) with everything inlined. The script, when included on a page, registers the `<my-element>` custom element, which wraps the target Kdu component using `@kdujs/web-component-wrapper`. The wrapper automatically proxies properties, attributes, events and slots. See the [docs for `@kdujs/web-component-wrapper`](https://github.com/kdujs/web-component-wrapper) for more details.

**Note the bundle relies on `Kdu` being globally available on the page.**

This mode allows consumers of your component to use the Kdu component as a normal DOM element:

``` html
<script src="https://unpkg.com/kdu"></script>
<script src="path/to/my-element.js"></script>

<!-- use in plain HTML, or in any other framework -->
<my-element></my-element>
```

### Bundle that Registers Multiple Web Components

When building a web component bundle, you can also target multiple components by using a glob as entry:

```
kdu-cli-service build --target wc --name foo 'src/components/*.kdu'
```

When building multiple web components, `--name` will be used as the prefix and the custom element name will be inferred from the component filename. For example, with `--name foo` and a component named `HelloWorld.kdu`, the resulting custom element will be registered as `<foo-hello-world>`.

### Async Web Component

When targeting multiple web components, the bundle may become quite large, and the user may only use a few of the components your bundle registers. The async web component mode produces a code-split bundle with a small entry file that provides the shared runtime between all the components, and registers all the custom elements upfront. The actual implementation of a component is then fetched on-demand only when an instance of the corresponding custom element is used on the page:

```
kdu-cli-service build --target wc-async --name foo 'src/components/*.kdu'
```

```
File                Size                        Gzipped

dist/foo.0.min.js    12.80 kb                    8.09 kb
dist/foo.min.js      7.45 kb                     3.17 kb
dist/foo.1.min.js    2.91 kb                     1.02 kb
dist/foo.js          22.51 kb                    6.67 kb
dist/foo.0.js        17.27 kb                    8.83 kb
dist/foo.1.js        5.24 kb                     1.64 kb
```

Now on the page, the user only needs to include Kdu and the entry file:

``` html
<script src="https://unpkg.com/kdu"></script>
<script src="path/to/foo.min.js"></script>

<!-- foo-one's implementation chunk is auto fetched when it's used -->
<foo-one></foo-one>
```


## Using kdux in builds

When building a [Webcomponent](#web-component) or [Library](#library), the entry point is not `main.js`, but an `entry-wc.js` file, generated here: [https://github.com/kdujs/kdu-cli/blob/main/packages/%40kdujs/cli-service/lib/commands/build/resolveWcEntry.js](https://github.com/kdujs/kdu-cli/blob/main/packages/%40kdujs/cli-service/lib/commands/build/resolveWcEntry.js)

So to use kdux in web component target, you need to initialize the store in `App.kdu`:

``` js
import store from './store'

// ...

export default {
  store,
  name: 'App',
  // ...
}
```
