module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-config-prettier'],
  // add your custom config here
  // https://stylelint.io/user-guide/configuration
  rules: {
    'font-family-no-missing-generic-family-keyword': null,
    ignoreAtRules: ['function', 'if', 'for'],
  },
}
