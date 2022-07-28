module.exports = cli => {
  cli.injectFeature({
    name: 'TypeScript',
    value: 'ts',
    short: 'TS',
    description: 'Add support for the TypeScript language',
    link: 'https://github.com/kdujs/kdu-cli/tree/main/packages/%40kdujs/cli-plugin-typescript',
    plugins: ['typescript']
  })

  cli.injectPrompt({
    name: 'tsClassComponent',
    when: answers => answers.features.includes('ts'),
    type: 'confirm',
    message: 'Use class-style component syntax?',
    description: 'Use the @Component decorator on classes.',
    link: 'https://kdujs-v2.web.app/v2/guide/typescript.html#Class-Style-Kdu-Components',
    default: answers => answers.kduVersion !== '3'
  })

  cli.injectPrompt({
    name: 'useTsWithBabel',
    when: answers => answers.features.includes('ts'),
    type: 'confirm',
    message: 'Use Babel alongside TypeScript (required for modern mode, auto-detected polyfills, transpiling JSX)?',
    description: 'It will output ES2015 and delegate the rest to Babel for auto polyfill based on browser targets.',
    default: answers => answers.features.includes('babel')
  })

  cli.onPromptComplete((answers, options) => {
    if (answers.features.includes('ts')) {
      const tsOptions = {
        classComponent: answers.tsClassComponent
      }
      if (answers.useTsWithBabel) {
        tsOptions.useTsWithBabel = true
      }
      options.plugins['@kdujs/cli-plugin-typescript'] = tsOptions
    }
  })
}
