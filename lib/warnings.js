const chalk = require('chalk')

module.exports = {
  v2SuffixTemplatesDeprecated (template, name) {
    const initCommand = 'kdu init ' + template.replace('-2.0', '') + ' ' + name

    console.log(chalk.red('  This template is deprecated, as the original template now uses Kdu 2.0 by default.'))
    console.log()
    console.log(chalk.yellow('  Please use this command instead: ') + chalk.green(initCommand))
    console.log()
  },
  v2BranchIsNowDefault (template, name) {
    const kdu1InitCommand = 'kdu init ' + template + '#1.0' + ' ' + name

    console.log(chalk.green('  This will install Kdu 2.x version of the template.'))
    console.log()
    console.log(chalk.yellow('  For Kdu 1.x use: ') + chalk.green(kdu1InitCommand))
    console.log()
  }
}
