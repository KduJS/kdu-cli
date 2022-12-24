exports.getPromptModules = () => {
  return [
    'kduVersion',
    'babel',
    'typescript',
    'pwa',
    'router',
    'kdux',
    'cssPreprocessors',
    'linter'
  ].map(file => require(`../promptModules/${file}`))
}
