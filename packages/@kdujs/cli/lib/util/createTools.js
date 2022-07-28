exports.getPromptModules = () => {
  return [
    'kduVersion',
    'babel',
    'typescript',
    'pwa',
    'router',
    'cssPreprocessors',
    'linter'
  ].map(file => require(`../promptModules/${file}`))
}
