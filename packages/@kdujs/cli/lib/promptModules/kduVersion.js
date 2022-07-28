module.exports = cli => {
  cli.injectPrompt({
    name: 'kduVersion',
    message: 'Choose a version of Kdu.js that you want to start the project with',
    type: 'list',
    choices: [
      {
        name: '3.x',
        value: '3'
      },
      {
        name: '2.x',
        value: '2'
      }
    ],
    default: '3'
  })

  cli.onPromptComplete((answers, options) => {
    if (answers.kduVersion) {
      options.kduVersion = answers.kduVersion
    }
  })
}
