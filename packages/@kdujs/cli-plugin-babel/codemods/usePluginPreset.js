module.exports = function (fileInfo, api) {
  const j = api.jscodeshift
  const root = j(fileInfo.source)

  const useDoubleQuote = root.find(j.Literal).some(({ node }) => node.raw.startsWith('"'))

  root
    .find(j.Literal, { value: '@kdujs/app' })
    .replaceWith(j.stringLiteral('@kdujs/cli-plugin-babel/preset'))
  root
    .find(j.Literal, { value: '@kdujs/babel-preset-app' })
    .replaceWith(j.stringLiteral('@kdujs/cli-plugin-babel/preset'))

  const templateLiterals = root
    .find(j.TemplateLiteral, {
      expressions: { length: 0 }
    })

  templateLiterals
    .find(j.TemplateElement, {
      value: {
        cooked: '@kdujs/app'
      }
    })
    .closest(j.TemplateLiteral)
    .replaceWith(j.stringLiteral('@kdujs/cli-plugin-babel/preset'))

  templateLiterals
    .find(j.TemplateElement, {
      value: {
        cooked: '@kdujs/babel-preset-app'
      }
    })
    .closest(j.TemplateLiteral)
    .replaceWith(j.stringLiteral('@kdujs/cli-plugin-babel/preset'))

  return root.toSource({
    lineTerminator: '\n',
    quote: useDoubleQuote ? 'double' : 'single'
  })
}
