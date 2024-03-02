/**
 * @file ESLint Configuration - Root
 * @module config/eslint
 * @see https://eslint.org/docs/user-guide/configuring
 */

/**
 * @type {import('eslint').Linter.Config}
 * @const config - ESLint configuration object
 */
const config = {
  extends: ['./.eslintrc.base.cjs'],
  overrides: [
    ...require('./.eslintrc.base.cjs').overrides,
    {
      files: ['__fixtures__/modules/*.mjs'],
      rules: {
        '@typescript-eslint/no-confusing-void-expression': 0,
        '@typescript-eslint/no-unsafe-argument': 0,
        '@typescript-eslint/no-unsafe-call': 0,
        '@typescript-eslint/no-unsafe-member-access': 0,
        '@typescript-eslint/no-unsafe-return': 0,
        '@typescript-eslint/require-await': 0,
        '@typescript-eslint/restrict-plus-operands': 0,
        '@typescript-eslint/restrict-template-expressions': 0,
        '@typescript-eslint/strict-boolean-expressions': 0,
        'jsdoc/require-file-overview': 0,
        'jsdoc/require-jsdoc': 0,
        'unicorn/prefer-math-trunc': 0,
        'unicorn/prefer-node-protocol': 0
      }
    }
  ],
  root: true
}

module.exports = config
