module.exports = cli => {
  cli.injectFeature({
    name: 'Kdux',
    value: 'kdux',
    description: 'Manage the app state with a centralized store',
    link: 'https://kduxjs.web.app/'
  })

  cli.onPromptComplete((answers, options) => {
    if (answers.features.includes('kdux')) {
      options.plugins['@kdujs/cli-plugin-kdux'] = {}
    }
  })
}
