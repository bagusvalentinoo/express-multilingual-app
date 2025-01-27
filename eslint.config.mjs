import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'
import preferArrowFunctionsPlugin from 'eslint-plugin-prefer-arrow-functions'

export default tseslint.config(
  {
    plugins: {
      'prefer-arrow-functions': preferArrowFunctionsPlugin
    },
    rules: {
      indent: ['error', 2],
      quotes: ['error', 'single'],
      semi: ['error', 'never'],
      'comma-dangle': ['error', 'never'],
      'max-len': ['error', { code: 80 }],
      'prefer-const': 'error',
      'no-console': 'error',
      'no-unused-vars': 'error',
      'no-var': 'error',
      'no-empty-function': 'error',
      'no-unreachable': 'error',
      curly: ['error', 'multi-line'],
      'no-else-return': 'error',
      'object-curly-spacing': ['error', 'always'],
      'nonblock-statement-body-position': ['error', 'beside'],
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
    }
  },
  eslint.configs.recommended,
  tseslint.configs.recommended
)
