import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'
import preferArrowFunctionsPlugin from 'eslint-plugin-prefer-arrow-functions'

export default tseslint.config(
  {
    plugins: {
      'prefer-arrow-functions': preferArrowFunctionsPlugin
    },
    rules: {
      // ============================
      // General Formatting Rules
      // ============================

      // Enforce consistent indentation (2 spaces)
      indent: ['error', 2],

      // Enforce single quotes for strings
      quotes: ['error', 'single'],

      // Disallow semicolons
      semi: ['error', 'never'],

      // Ensure trailing commas are not used
      'comma-dangle': ['error', 'never'],

      // Maximum line length to 80 characters
      'max-len': ['error', { code: 80 }],

      // ============================
      // Code Quality & Best Practices
      // ============================

      // Prefer const over var for variable declarations
      'prefer-const': 'error',

      // Disallow the use of console (use logging framework instead)
      'no-console': 'error',

      // Disallow unused variables
      'no-unused-vars': 'error',

      // Disallow variable declarations using var
      'no-var': 'error',

      // Ensure no empty functions are written
      'no-empty-function': 'error',

      // Ensure there are no unreachable code
      'no-unreachable': 'error',

      // ============================
      // Control Flow Statements
      // ============================

      // Forcing no curly braces in control flow statements (one-liner style)
      curly: ['error', 'multi-line'],

      // No return statements inside else blocks
      'no-else-return': 'error',

      // ============================
      // Code Structure & Spacing
      // ============================

      // Ensure object curly braces have spacing
      'object-curly-spacing': ['error', 'always'],

      // eslint-disable-next-line max-len
      // Ensure non-block statements (e.g., if) are written in a single line if possible
      'nonblock-statement-body-position': ['error', 'beside'],

      // ============================
      // Special Rules for Functions
      // ============================

      // Prefer arrow functions over traditional function expressions
      'prefer-arrow-functions/prefer-arrow-functions': [
        'error',
        {
          allowNamedFunctions: false, // Disallow named function expressions
          // eslint-disable-next-line max-len
          classPropertiesAllowed: false, // Disallow arrow functions as class properties
          // eslint-disable-next-line max-len
          disallowPrototype: false, // Allow methods to be declared on prototypes
          returnStyle: 'unchanged', // Keep the return style unchanged
          // eslint-disable-next-line max-len
          singleReturnOnly: false // Allow multiple return statements in the function
        }
      ]
    }
  },
  eslint.configs.recommended,
  tseslint.configs.recommended
)
