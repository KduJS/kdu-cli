module.exports = {
  extends: [
    "plugin:kdu-libs/recommended"
  ],
  plugins: [
    "node"
  ],
  env: {
    "jest": true
  },
  rules: {
    "indent": ["error", 2, {
      "MemberExpression": "off"
    }]
  },
  overrides: [
    {
      files: ['**/__tests__/**/*.js', "**/cli-test-utils/**/*.js"],
      rules: {
        "node/no-extraneous-require": "off"
      }
    }
  ]
}
