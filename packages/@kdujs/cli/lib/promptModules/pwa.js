module.exports = cli => {
  cli.injectFeature({
    name: 'Progressive Web App (PWA) Support',
    value: 'pwa',
    short: 'PWA',
    description: 'Improve performances with features like Web manifest and Service workers',
    link: 'https://github.com/kdujs/kdu-cli/tree/main/packages/%40kdujs/cli-plugin-pwa'
  })

  cli.onPromptComplete((answers, options) => {
    if (answers.features.includes('pwa')) {
      options.plugins['@kdujs/cli-plugin-pwa'] = {}
    }
  })
}
