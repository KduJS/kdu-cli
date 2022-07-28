# Modes and Environment Variables

## Modes

**Mode** is an important concept in Kdu CLI projects. By default, there are two modes:

- `development` is used by `kdu-cli-service serve`
- `production` is used by `kdu-cli-service build`

You can overwrite the default mode used for a command by passing the `--mode` option flag. For example, if you want to use development variables in the build command:

```
kdu-cli-service build --mode development
```

When running `kdu-cli-service`, environment variables are loaded from all [corresponding files](#environment-variables). If they don't contain a `NODE_ENV` variable, it will be set accordingly. For example, `NODE_ENV` will be set to `"production"` in production mode, `"test"` in test mode, and defaults to `"development"` otherwise.

Then `NODE_ENV` will determine the primary mode your app is running in - development, production or test - and consequently, what kind of webpack config will be created.

With `NODE_ENV` set to "test" for example, Kdu CLI creates a webpack config that is intended to be used and optimized for unit tests. It doesn't process images and other assets that are unnecessary for unit tests.

Similarly, `NODE_ENV=development` creates a webpack configuration which enables HMR, doesn't hash assets or create vendor bundles in order to allow for fast re-builds when running a dev server.

When you are running `kdu-cli-service build`, your `NODE_ENV` should always be set to "production" to obtain an app ready for deployment, regardless of the environment you're deploying to.

::: warning NODE_ENV
If you have a default `NODE_ENV` in your environment, you should either remove it or explicitly set `NODE_ENV` when running `kdu-cli-service` commands.
:::

## Environment Variables

You can specify env variables by placing the following files in your project root:

```bash
.env                # loaded in all cases
.env.local          # loaded in all cases, ignored by git
.env.[mode]         # only loaded in specified mode
.env.[mode].local   # only loaded in specified mode, ignored by git
```

An env file simply contains key=value pairs of environment variables:

```
FOO=bar
KDU_APP_NOT_SECRET_CODE=some_value
```

::: warning
Do not store any secrets (such as private API keys) in your app!

Environment variables are embedded into the build, meaning anyone can view them by inspecting your app's files.
:::

Note that only `NODE_ENV`, `BASE_URL`, and variables that start with `KDU_APP_` will be statically embedded into the *client bundle* with `webpack.DefinePlugin`. It is to avoid accidentally exposing a private key on the machine that could have the same name.

For more detailed env parsing rules, please refer to [the documentation of `dotenv`](https://github.com/motdotla/dotenv#rules). We also use [dotenv-expand](https://github.com/motdotla/dotenv-expand) for variable expansion (available in Kdu CLI 3.5+). For example:

```bash
FOO=foo
BAR=bar

CONCAT=$FOO$BAR # CONCAT=foobar
```

Loaded variables will become available to all `kdu-cli-service` commands, plugins and dependencies.

::: tip Env Loading Priorities

An env file for a specific mode (e.g. `.env.production`) will take higher priority than a generic one (e.g. `.env`).

In addition, environment variables that already exist when Kdu CLI is executed have the highest priority and will not be overwritten by `.env` files.

`.env` files are loaded at the start of `kdu-cli-service`. Restart the service after making changes.
:::

### Example: Staging Mode

Assuming we have an app with the following `.env` file:

```
KDU_APP_TITLE=My App
```

And the following `.env.staging` file:

```
NODE_ENV=production
KDU_APP_TITLE=My Staging App
```

- `kdu-cli-service build` builds a production app, loading `.env`, `.env.production` and `.env.production.local` if they are present;

- `kdu-cli-service build --mode staging` builds a production app in staging mode, using `.env`, `.env.staging` and `.env.staging.local` if they are present.

In both cases, the app is built as a production app because of the `NODE_ENV`, but in the staging version, `process.env.KDU_APP_TITLE` is overwritten with a different value.

### Using Env Variables in Client-side Code

You can access env variables in your application code:

``` js
console.log(process.env.KDU_APP_NOT_SECRET_CODE)
```

During build, `process.env.KDU_APP_NOT_SECRET_CODE` will be replaced by the corresponding value. In the case of `KDU_APP_NOT_SECRET_CODE=some_value`, it will be replaced by `"some_value"`.

In addition to `KDU_APP_*` variables, there are also two special variables that will always be available in your app code:

- `NODE_ENV` - this will be one of `"development"`, `"production"` or `"test"` depending on the [mode](#modes) the app is running in.
- `BASE_URL` - this corresponds to the `publicPath` option in `kdu.config.js` and is the base path your app is deployed at.

All resolved env variables will be available inside `public/index.html` as discussed in [HTML - Interpolation](./html-and-static-assets.md#interpolation).

::: tip
You can have computed env vars in your `kdu.config.js` file. They still need to be prefixed with `KDU_APP_`. This is useful for version info

```js
process.env.KDU_APP_VERSION = require('./package.json').version

module.exports = {
  // config
}
```
:::

### Local Only Variables

Sometimes you might have env variables that should not be committed into the codebase, especially if your project is hosted in a public repository. In that case you should use an `.env.local` file instead. Local env files are ignored in `.gitignore` by default.

`.local` can also be appended to mode-specific env files, for example `.env.development.local` will be loaded during development, and is ignored by git.
