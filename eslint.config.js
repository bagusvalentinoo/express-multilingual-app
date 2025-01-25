import globals from 'globals'
import pluginJs from '@eslint/js'
import preferArrowFunctionsPlugin from 'eslint-plugin-prefer-arrow-functions'

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node
      }
    },
    plugins: {
      'prefer-arrow-functions': preferArrowFunctionsPlugin
    },
    rules: {
      semi: ['error', 'never'],
      'comma-dangle': ['error', 'never'],
      indent: ['error', 2],
      'object-curly-spacing': ['error', 'always'],
      quotes: ['error', 'single'],
      'prefer-arrow-functions/prefer-arrow-functions': [
        'error',
        {
          allowNamedFunctions: false,
          classPropertiesAllowed: false,
          disallowPrototype: false,
          returnStyle: 'unchanged',
          singleReturnOnly: false
        }
      ]
    },
    ignores: [
      'node_modules',
      'dist',
      'build',
      'public',
      'coverage',
      'reports',
      'logs',
      'tmp'
    ]
  },
  pluginJs.configs.recommended
]
