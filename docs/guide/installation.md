# Installation

::: warning Warning regarding Previous Versions
The package name changed from `kdu-cli` to `@kdujs/cli`.
If you have the previous `kdu-cli` (1.x or 2.x) package installed globally, you need to uninstall it first with `npm uninstall kdu-cli -g` or `yarn global remove kdu-cli`.
:::

::: tip Node Version Requirement
Kdu CLI 4.x requires [Node.js](https://nodejs.org/) version 8.9 or above (v10+ recommended). You can manage multiple versions of Node on the same machine with [n](https://github.com/tj/n), [nvm](https://github.com/creationix/nvm) or [nvm-windows](https://github.com/coreybutler/nvm-windows).
:::

To install the new package, use one of the following commands. You need administrator privileges to execute these unless npm was installed on your system through a Node.js version manager (e.g. n or nvm).

```bash
npm install -g @kdujs/cli
# OR
yarn global add @kdujs/cli
```

After installation, you will have access to the `kdu` binary in your command line. You can verify that it is properly installed by simply running `kdu`, which should present you with a help message listing all available commands.

You can check you have the right version with this command:

```bash
kdu --version
```

### Upgrading

To upgrade the global Kdu CLI package, you need to run:

```bash
npm update -g @kdujs/cli

# OR
yarn global upgrade --latest @kdujs/cli
```

#### Project Dependencies

Upgrade commands shown above apply to the global Kdu CLI installation. To upgrade one or more `@kdujs/cli` related packages (including packages starting with `@kdujs/cli-plugin-` or `kdu-cli-plugin-`) inside your project, run `kdu upgrade` inside the project directory:

```
Usage: upgrade [options] [plugin-name]

(experimental) upgrade kdu cli service / plugins

Options:
  -t, --to <version>    Upgrade <plugin-name> to a version that is not latest
  -f, --from <version>  Skip probing installed plugin, assuming it is upgraded from the designated version
  -r, --registry <url>  Use specified npm registry when installing dependencies
  --all                 Upgrade all plugins
  --next                Also check for alpha / beta / rc versions when upgrading
  -h, --help            output usage information
```
