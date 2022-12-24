const inquirer = require('inquirer')
const {
  execa,
  warn,
  hasProjectGit
} = require('@kdujs/cli-shared-utils')

module.exports = async function confirmIfGitDirty (context) {
  if (process.env.KDU_CLI_SKIP_DIRTY_GIT_PROMPT || process.env.KDU_CLI_API_MODE) {
    return true
  }

  process.env.KDU_CLI_SKIP_DIRTY_GIT_PROMPT = true

  if (!hasProjectGit(context)) {
    return true
  }

  const { stdout } = await execa('git', ['status', '--porcelain'], { cwd: context })
  if (!stdout) {
    return true
  }

  warn(`There are uncommitted changes in the current repository, it's recommended to commit or stash them first.`)
  const { ok } = await inquirer.prompt([
    {
      name: 'ok',
      type: 'confirm',
      message: 'Still proceed?',
      default: false
    }
  ])
  return ok
}
