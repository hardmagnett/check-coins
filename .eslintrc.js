module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: [
    'airbnb-base',
    'plugin:vue/recommended',
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-unused-vars': 'warn',
    'no-unreachable': 'warn',
    'no-constant-condition': 'warn',
    'no-empty': 'warn',
    'no-shadow': 'warn',
    'guard-for-in': 'warn',
    'no-tabs': 'warn',
    'prefer-const': 'warn',
    'no-trailing-spaces': 'warn',
    'no-multiple-empty-lines': 'warn',
    'space-infix-ops': 'warn',
    'semi': ['warn', 'never'],
    'no-restricted-syntax': 'off',
    'padded-blocks': 'off',
    'no-unused-expressions': 'off',
    'func-names': 'off',
    'max-len': 'off',
    'no-continue': 'off',
    'import/no-unresolved': 'off',
    'import/extensions': 'off',
    'no-underscore-dangle': 'off',
    'no-param-reassign': 'off',
    'vue/no-unused-vars': 'warn',
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
}
