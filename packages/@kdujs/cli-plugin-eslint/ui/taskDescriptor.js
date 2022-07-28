const task = {
  match: /kdu-cli-service lint/,
  description: 'app.web.kdujs-eslint.tasks.lint.description',
  link: 'https://github.com/kdujs/kdu-cli/tree/main/packages/%40kdujs/cli-plugin-eslint#injected-commands',
  prompts: [
    {
      name: 'noFix',
      type: 'confirm',
      default: false,
      description: 'app.web.kdujs-eslint.tasks.lint.noFix'
    }
  ],
  onBeforeRun: ({ answers, args }) => {
    if (answers.noFix) args.push('--no-fix')
  }
}

module.exports = {
  task
}
