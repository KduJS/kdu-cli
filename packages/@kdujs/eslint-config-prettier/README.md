# @kdujs/eslint-config-prettier

> eslint-config-prettier for kdu-cli

This config is specifically designed to be used by `kdu-cli` setups
and is not meant for outside use (it can be used but some adaptations
on the user side might be needed - for details see the config file).

A part of its design is that this config may implicitly depend on
other parts of `kdu-cli` setups, such as `eslint-plugin-kdu` being
extended in the same resulting config.
