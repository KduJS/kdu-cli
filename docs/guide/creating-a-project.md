# Creating a Project

## kdu create

To create a new project, run:

```bash
kdu create hello-world
```

::: warning
If you are on Windows using Git Bash with minTTY, the interactive prompts will not work. You must launch the command as `winpty kdu.cmd create hello-world`.
If you however want to still use the `kdu create hello-world` syntax, you can alias the command by adding the following line to your `~/.bashrc` file.
`alias kdu='winpty kdu.cmd'`
You will need to restart your Git Bash terminal session to pull in the updated bashrc file.
:::

You will be prompted to pick a preset. You can either choose the default preset which comes with a basic Babel + ESLint setup, or select "Manually select features" to pick the features you need.

The default setup is great for quickly prototyping a new project, while the manual setup provides more options that are likely needed for more production-oriented projects.

If you chose to manually select features, at the end of the prompts you also have the option to save your selections as a preset so that you can reuse it in the future. We will discuss presets and plugins in the next section.

::: tip ~/.kdurc
Saved presets will be stored in a JSON file named `.kdurc` in your user home directory. If you wish to modify saved presets / options, you can do so by editing this file.

During the project creation process, you may also be prompted to select a preferred package manager, or use the [Taobao npm registry mirror](https://npmmirror.com/) for faster dependency installation. Your choices will also be saved in `~/.kdurc`.
:::

The `kdu create` command has a number of options and you can explore them all by running:

```bash
kdu create --help
```

```
Usage: create [options] <app-name>

create a new project powered by kdu-cli-service


Options:

  -p, --preset <presetName>       Skip prompts and use saved or remote preset
  -d, --default                   Skip prompts and use default preset
  -i, --inlinePreset <json>       Skip prompts and use inline JSON string as preset
  -m, --packageManager <command>  Use specified npm client when installing dependencies
  -r, --registry <url>            Use specified npm registry when installing dependencies
  -g, --git [message|false]       Force / skip git initialization, optionally specify initial commit message
  -n, --no-git                    Skip git initialization
  -f, --force                     Overwrite target directory if it exists
  --merge                         Merge target directory if it exists
  -c, --clone                     Use git clone when fetching remote preset
  -x, --proxy                     Use specified proxy when creating project
  -b, --bare                      Scaffold project without beginner instructions
  --skipGetStarted                Skip displaying "Get started" instructions
  -h, --help                      Output usage information
```

## Pulling 2.x Templates (Legacy)

Kdu CLI >= 3 uses the same `kdu` binary, so it overwrites Kdu CLI 2 (`kdu-cli`). If you still need the legacy `kdu init` functionality, you can install a global bridge:

```bash
npm install -g @kdujs/cli-init
# kdu init now works exactly the same as kdu-cli@2.x
kdu init webpack my-project
```
