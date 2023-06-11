---
sidebarDepth: 0
---

# Overview

Kdu CLI is a full system for rapid Kdu.js development, providing:

- Interactive project scaffolding via `@kdujs/cli`.
- A runtime dependency (`@kdujs/cli-service`) that is:
  - Upgradeable;
  - Built on top of webpack, with sensible defaults;
  - Configurable via in-project config file;
  - Extensible via plugins
- A rich collection of official plugins integrating the best tools in the frontend ecosystem.
- A full graphical user interface to create and manage Kdu.js projects.

Kdu CLI aims to be the standard tooling baseline for the Kdu ecosystem. It ensures the various build tools work smoothly together with sensible defaults so you can focus on writing your app instead of spending days wrangling with configurations. At the same time, it still offers the flexibility to tweak the config of each tool without the need for ejecting.

## Components of the System

There are several moving parts of Kdu CLI - if you look at the [source code](https://github.com/kdujs/kdu-cli/tree/main/packages/%40kdujs), you will find that it is a monorepo containing a number of separately published packages.

### CLI

The CLI (`@kdujs/cli`) is a globally installed npm package and provides the `kdu` command in your terminal. It provides the ability to quickly scaffold a new project via `kdu create`. You can also manage your projects using a graphical user interface via `kdu ui`. We will walk through what it can do in the next few sections of the guide.

### CLI Service

The CLI Service (`@kdujs/cli-service`) is a development dependency. It's an npm package installed locally into every project created by `@kdujs/cli`.

The CLI Service is built on top of [webpack](http://webpack.js.org/) and [webpack-dev-server](https://github.com/webpack/webpack-dev-server). It contains:

- The core service that loads other CLI Plugins;
- An internal webpack config that is optimized for most apps;
- The `kdu-cli-service` binary inside the project, which comes with the basic `serve`, `build` and `inspect` commands.

If you are familiar with [create-react-app](https://github.com/facebookincubator/create-react-app), `@kdujs/cli-service` is roughly the equivalent of `react-scripts`, although the feature set is different.

The section on [CLI Service](./cli-service.md) covers its detailed usage.

### CLI Plugins

CLI Plugins are npm packages that provide optional features to your Kdu CLI projects, such as Babel/TypeScript transpilation, ESLint integration, unit testing, and end-to-end testing. It's easy to spot a Kdu CLI plugin as their names start with either `@kdujs/cli-plugin-` (for built-in plugins) or `kdu-cli-plugin-` (for community plugins).

When you run the `kdu-cli-service` binary inside your project, it automatically resolves and loads all CLI Plugins listed in your project's `package.json`.

Plugins can be included as part of your project creation process or added into the project later. They can also be grouped into reusable presets. We will discuss these in more depth in the [Plugins and Presets](./plugins-and-presets.md) section.
