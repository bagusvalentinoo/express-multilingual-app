import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'
import eslintPluginImport from 'eslint-plugin-import'
import eslintPluginPreferArrowFunctions from 'eslint-plugin-prefer-arrow-functions'
import eslintPluginJsdoc from 'eslint-plugin-jsdoc'

export default tseslint.config(
  {
    files: ['**/*.ts', '**/*.tsx'],
    plugins: {
      import: eslintPluginImport, // Enforce import plugin
      'prefer-arrow-functions': eslintPluginPreferArrowFunctions, // Enforce prefer-arrow-functions plugin
      jsdoc: eslintPluginJsdoc // Enforce jsdoc plugin
    },
    languageOptions: {
      parser: tseslint.parser, // Enforce TypeScript parser
      parserOptions: {
        project: true, // Enforce project configuration
        tsconfigRootDir: import.meta.dirname, // Enforce tsconfig root directory
        ecmaVersion: 'latest', // Enforce latest ECMAScript version
        sourceType: 'module' // Enforce module source type
      }
    },
    settings: {
      // eslint-plugin-jsdoc
      jsdoc: {
        mode: 'typescript', // Enforce TypeScript mode
        tagNamePreference: {
          returns: 'returns', // Enforce returns tag
          yields: 'yields', // Enforce yields tag
          throws: 'throws' // Enforce throws tag
        },
        preferredTypes: {
          object: 'Object', // Enforce object type
          array: 'Array', // Enforce array type
          'object[]': 'Array<Object>', // Enforce object array type
          'array[]': 'Array<Array>' // Enforce array array type
        }
      }
    },
    rules: {
      indent: [
        // Enforce consistent indentation
        'error',
        2,
        {
          SwitchCase: 1, // Enforce consistent indentation for switch cases
          FunctionExpression: { parameters: 'first' }, // Enforce consistent indentation for function expressions
          CallExpression: { arguments: 'first' }, // Enforce consistent indentation for call expressions
          ArrayExpression: 'first', // Enforce consistent indentation for array expressions
          ObjectExpression: 'first' // Enforce consistent indentation for object expressions
        }
      ],
      quotes: ['error', 'single'], // Enforce single quotes
      semi: ['error', 'never'], // Enforce no semicolons
      'comma-dangle': ['error', 'never'], // Enforce no trailing commas
      'max-len': [
        // Enforce a maximum line length
        'error',
        {
          code: 80, // Enforce a maximum line length of 80 characters
          tabWidth: 2, // Enforce a tab width of 2 spaces
          ignoreUrls: true, // Ignore URLs
          ignoreComments: true, // Ignore comments
          ignoreTrailingComments: true, // Ignore trailing comments
          ignoreStrings: true, // Ignore strings
          ignoreTemplateLiterals: true, // Ignore template literals
          ignoreRegExpLiterals: true // Ignore regular expression literals
        }
      ],
      'prefer-const': 'warn', // Enforce consistent use of const
      'no-console': 'warn', // Disallow console
      'no-unused-vars': 'error', // Disallow unused variables
      'no-var': 'error', // Disallow var
      'no-empty-function': 'warn', // Disallow empty functions
      'no-unreachable': 'error', // Disallow unreachable code
      'no-else-return': 'error', // Disallow else return
      'no-dupe-else-if': 'error', // Disallow duplicate else if
      'no-duplicate-case': 'error', // Disallow duplicate case
      'no-duplicate-imports': 'warn', // Disallow duplicate imports
      'no-restricted-imports': [
        'error',
        {
          name: 'i18next',
          message: 'Please import from `@/lib/i18n/i18n` instead.',
          importNames: ['t']
        }
      ],
      eqeqeq: ['error', 'always'], // Enforce consistent use of === and !==
      'max-params': ['error', 4], // Enforce a maximum number of parameters
      'arrow-parens': ['error', 'as-needed'], // Enforce consistent use of parentheses
      'arrow-spacing': 'error', // Enforce consistent spacing after the arrow in arrow functions
      'array-bracket-spacing': ['error', 'never'], // Enforce consistent spacing inside array brackets
      'prefer-destructuring': [
        // Enforce consistent use of destructuring
        'error',
        {
          array: false, // Disallow destructuring arrays
          object: true // Enforce destructuring objects
        }
      ],
      'object-curly-spacing': ['error', 'always'], // Enforce consistent spacing inside curly braces
      'template-curly-spacing': ['error', 'never'], // Enforce consistent spacing inside template literals

      // typescript-eslint
      '@typescript-eslint/no-explicit-any': 'warn', // Disallow the use of the any type
      '@typescript-eslint/no-unused-vars': [
        // Disallow unused variables
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' } // Disallow unused variables with leading underscores
      ],
      '@typescript-eslint/consistent-type-imports': [
        // Enforce consistent type imports
        'error',
        {
          prefer: 'type-imports' // Enforce type imports
        }
      ],
      '@typescript-eslint/strict-boolean-expressions': 'error', // Enforce strict boolean expressions
      '@typescript-eslint/no-floating-promises': 'error', // Disallow floating promises
      '@typescript-eslint/await-thenable': 'error', // Disallow await thenable
      '@typescript-eslint/no-misused-promises': 'error', // Disallow misused promises
      '@typescript-eslint/ban-ts-comment': 'warn', // Disallow ts-comments
      '@typescript-eslint/prefer-nullish-coalescing': 'error', // Enforce consistent use of nullish coalescing
      '@typescript-eslint/prefer-optional-chain': 'error', // Enforce consistent use of optional chaining

      // eslint-plugin-import
      'import/order': [
        // Enforce consistent import order
        'error',
        {
          groups: [
            'builtin', // Builtin imports
            'external', // External imports
            'internal', // Internal imports
            ['parent', 'sibling'], // Parent and sibling imports
            'index' // Index imports
          ],
          pathGroups: [
            {
              pattern: '@/**', // Pattern for internal imports
              group: 'internal' // Group for internal imports
            }
          ],
          pathGroupsExcludedImportTypes: ['builtin'], // Excluded import types
          alphabetize: {
            order: 'asc', // Alphabetical order
            caseInsensitive: true // Case insensitive
          },
          'newlines-between': 'always' // Newlines between
        }
      ],

      // eslint-plugin-jsdoc
      'jsdoc/check-access': 'error', // Enforce access checks
      'jsdoc/check-alignment': 'error', // Enforce alignment checks
      'jsdoc/check-indentation': 'error', // Enforce indentation checks
      'jsdoc/check-line-alignment': ['error', 'always'], // Enforce line alignment
      'jsdoc/check-syntax': 'error', // Enforce syntax checks
      'jsdoc/check-param-names': [
        // Enforce parameter name checks
        'error',
        {
          checkDestructured: true, // Enforce destructured parameter checks
          allowExtraTrailingParamDocs: false, // Disallow extra trailing parameter documentation
          checkRestProperty: true, // Enforce rest property checks
          enableFixer: true, // Enable fixer
          useDefaultObjectProperties: true, // Enforce use of default object properties
          disableExtraPropertyReporting: false, // Disallow extra property reporting
          disableMissingParamChecks: false // Disallow missing parameter checks
        }
      ],
      'jsdoc/check-types': [
        // Enforce type checks
        'error',
        {
          noDefaults: false, // Disallow defaults
          unifyParentAndChildTypeChecks: true, // Enforce unified parent and child type checks
          exemptTagContexts: [
            {
              tag: 'typedef',
              types: true // Enforce types
            }
          ]
        }
      ],
      'jsdoc/no-undefined-types': [
        // Enforce no undefined types
        'error',
        {
          definedTypes: [
            'Promise', // Enforce Promise type
            'Express', // Enforce Express type
            'Request', // Enforce Request type
            'Response', // Enforce Response type
            'NextFunction', // Enforce NextFunction type
            'Buffer', // Enforce Buffer type
            'Bun', // Enforce Bun type
            'BunFile', // Enforce BunFile type
            'BunRequest', // Enforce BunRequest type
            'BunResponse' // Enforce BunResponse type
          ]
        }
      ],
      'jsdoc/no-types': [
        // Enforce no types
        'error',
        {
          contexts: ['any'] // Enforce any type
        }
      ],
      'jsdoc/require-description': [
        // Enforce require description
        'error',
        {
          contexts: ['any'], // Enforce any type
          checkConstructors: true, // Enforce constructor checks
          checkGetters: true, // Enforce getter checks
          checkSetters: true // Enforce setter checks
        }
      ],
      'jsdoc/require-example': [
        // Enforce require example
        'error',
        {
          exemptedBy: ['inheritdoc', 'type', 'private', 'internal'], // Enforce exemptions
          exemptNoArguments: false, // Disallow no arguments
          checkConstructors: true, // Enforce constructor checks
          checkGetters: true, // Enforce getter checks
          checkSetters: true, // Enforce setter checks
          enableFixer: true // Enable fixer
        }
      ],
      'jsdoc/require-jsdoc': [
        // Enforce require jsdoc
        'error',
        {
          publicOnly: {
            ancestorsOnly: true, // Enforce ancestors only
            esm: true, // Enforce esm
            cjs: true, // Enforce cjs
            window: false // Disallow window
          },
          require: {
            ArrowFunctionExpression: true, // Enforce ArrowFunctionExpression
            ClassDeclaration: true, // Enforce ClassDeclaration
            ClassExpression: true, // Enforce ClassExpression
            FunctionDeclaration: true, // Enforce FunctionDeclaration
            FunctionExpression: true, // Enforce FunctionExpression
            MethodDefinition: true // Enforce MethodDefinition
          },
          contexts: [
            'PropertyDefinition', // Enforce PropertyDefinition
            'TSInterfaceDeclaration', // Enforce TSInterfaceDeclaration
            'TSTypeAliasDeclaration', // Enforce TSTypeAliasDeclaration
            'TSMethodSignature', // Enforce TSMethodSignature
            'TSPropertySignature', // Enforce TSPropertySignature
            'TSEnumDeclaration' // Enforce TSEnumDeclaration
          ],
          exemptEmptyConstructors: true, // Disallow empty constructors
          exemptEmptyFunctions: true, // Disallow empty functions
          checkConstructors: true, // Enforce constructor checks
          checkGetters: true, // Enforce getter checks
          checkSetters: true, // Enforce setter checks
          minLineCount: 3, // Enforce a minimum line count
          enableFixer: true, // Enable fixer
          fixerMessage: '/** TODO: Add description */' // Enforce fixer message
        }
      ],
      'jsdoc/require-param': [
        // Enforce require param
        'error',
        {
          enableFixer: true, // Enable fixer
          enableRootFixer: true, // Enable root fixer
          enableRestElementFixer: true, // Enable rest element fixer
          checkDestructured: true, // Enforce destructured checks
          checkDestructuredRoots: true, // Enforce destructured roots checks
          checkRestProperty: true, // Enforce rest property checks
          autoIncrementBase: 0, // Enforce auto increment base
          unnamedRootBase: ['param', 'options', 'config'], // Enforce unnamed root base
          exemptedBy: ['inheritdoc', 'private', 'internal', 'type'], // Enforce exemptions
          contexts: [
            'FunctionDeclaration', // Enforce FunctionDeclaration
            'FunctionExpression', // Enforce FunctionExpression
            'ArrowFunctionExpression', // Enforce ArrowFunctionExpression
            'TSMethodSignature', // Enforce TSMethodSignature
            'MethodDefinition' // Enforce MethodDefinition
          ],
          ignoreWhenAllParamsMissing: false // Disallow ignore when all params are missing
        }
      ],
      'jsdoc/require-returns': [
        // Enforce require returns
        'error',
        {
          checkConstructors: false, // Disallow check constructors
          checkGetters: true, // Enforce check getters
          forceReturnsWithAsync: true // Enforce force returns with async
        }
      ],
      'jsdoc/require-returns-type': 'error', // Enforce require returns type
      'jsdoc/require-throws': 'error', // Enforce require throws
      'jsdoc/require-yields': 'error', // Enforce require yields
      'jsdoc/sort-tags': 'error', // Enforce sort tags
      'jsdoc/tag-lines': ['error', 'always', { count: 0, startLines: 1 }] // Enforce tag lines
    },
    ignores: [
      // Ignore files
      '**/.husky/**', // Ignore husky files
      '**/coverage/**', // Ignore coverage files
      '**/dist/**', // Ignore dist files
      '**/logs/**', // Ignore logs files
      '**/node_modules/**', // Ignore node_modules files
      '**/.gitignore', // Ignore gitignore files
      '**/bun.lockb', // Ignore bun.lockb files
      '**/yarn.lock', // Ignore yarn.lock files
      '**/package-lock.json', // Ignore package-lock.json files
      '**/LICENSE', // Ignore LICENSE files
      '**/README.md', // Ignore README.md files
      'eslint.config.mjs', // Ignore eslint config
      '**/tests/**' // Ignore tests files
    ]
  },
  eslint.configs.recommended, // Enforce recommended eslint config
  tseslint.configs.recommended, // Enforce recommended typescript eslint config
  eslintPluginJsdoc.configs['flat/recommended-typescript-error'] // Enforce recommended typescript eslint plugin config
)
