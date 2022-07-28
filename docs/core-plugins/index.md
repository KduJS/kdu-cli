# Plugins

Kdu CLI uses a plugin-based architecture. If you inspect a newly created project's `package.json`, you will find dependencies that start with `@kdujs/cli-plugin-`. Plugins can modify the internal webpack configuration and inject commands to `kdu-cli-service`. Most of the features listed during the project creation process are implemented as plugins.

This section contains documentation for core Kdu CLI plugins:

- [Babel](babel.md)
- [TypeScript](typescript.md)
- [ESLint](eslint.md)
- [PWA](pwa.md)
