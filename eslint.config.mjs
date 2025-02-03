import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'
import preferArrowFunctionsPlugin from 'eslint-plugin-prefer-arrow-functions'
import jsdoc from 'eslint-plugin-jsdoc'

export default tseslint.config(
  {
    plugins: {
      'prefer-arrow-functions': preferArrowFunctionsPlugin,
      jsdoc
    },
    rules: {
      indent: ['error', 2],
      quotes: ['error', 'single'],
      semi: ['error', 'never'],
      'comma-dangle': ['error', 'never'],
      'max-len': ['error', { code: 100 }],
      'prefer-const': 'warn',
      'no-console': 'warn',
      'no-unused-vars': 'error',
      'no-var': 'error',
      'no-empty-function': 'error',
      'no-unreachable': 'error',
      'no-else-return': 'error',
      'no-duplicate-imports': 'error',
      'arrow-parens': ['error', 'as-needed'],
      'arrow-spacing': 'error',
      'array-bracket-spacing': ['error', 'never'],
      'prefer-destructuring': [
        'error',
        {
          array: true,
          object: true
        }
      ],
      'object-curly-spacing': ['error', 'always'],
      'template-curly-spacing': ['error', 'never'],
      'prefer-arrow-functions/prefer-arrow-functions': [
        'error',
        {
          allowNamedFunctions: false,
          classPropertiesAllowed: false,
          disallowPrototype: false,
          returnStyle: 'unchanged',
          singleReturnOnly: false
        }
      ],
      'jsdoc/require-description': ['warn'],
      'jsdoc/tag-lines': 1
    },
    ignores: [
      '**/.husky/**',
      '**/coverage/**',
      '**/dist/**',
      '**/logs/**',
      '**/node_modules/**',
      '**/.gitignore',
      '**/bun.lockb',
      '**/yarn.lock',
      '**/package-lock.json',
      '**/LICENSE',
      '**/README.md'
    ]
  },
  eslint.configs.recommended,
  tseslint.configs.recommended,
  jsdoc.configs['flat/recommended']
)
