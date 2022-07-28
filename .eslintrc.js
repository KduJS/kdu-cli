module.exports = {
  extends: [
    '@kdujs/standard'
  ],
  globals: {
    name: 'off'
  },
  rules: {
    indent: ['error', 2, {
      MemberExpression: 'off'
    }],
    quotes: [2, 'single', { avoidEscape: true, allowTemplateLiterals: true }],
    'quote-props': 'off',
    'no-shadow': ['error'],
    'node/no-extraneous-require': ['error', {
      allowModules: [
        '@kdujs/cli-service'
      ]
    }]
  },
  overrides: [
    {
      files: ['**/__tests__/**/*.js'],
      env: {
        jest: true
      },
      rules: {
        'node/no-extraneous-require': 'off'
      }
    }
  ]
}
