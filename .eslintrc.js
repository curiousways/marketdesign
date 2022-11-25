// It seems that when using `overrides` any rules configured in the base config
// do not necessarily get applied in those overide configs. This was noticed
// primarily with eslint-plugin-import, although it is possible there are more,
// so to be sure any common rules are set here and merged into all configs.
const commmonRules = {
  curly: ['error', 'all'],
  eqeqeq: ['error', 'smart'],
  'import/extensions': ['error', 'never'],
  'prefer-regex-literals': ['error', { disallowRedundantWrapping: false }],
  'import/order': [
    'error',
    {
      groups: [
        ['external', 'builtin'],
        'internal',
        ['parent', 'sibling', 'index'],
      ],
    },
  ],
  'sort-imports': [
    'error',
    {
      ignoreCase: true,
      ignoreDeclarationSort: true,
      ignoreMemberSort: false,
      memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
    },
  ],
  'padding-line-between-statements': [
    'error',
    {
      blankLine: 'always',
      prev: ['*'],
      next: ['block-like', 'return', 'class'],
    },
    {
      blankLine: 'always',
      prev: ['block-like', 'return', 'class'],
      next: ['*'],
    },
    { blankLine: 'any', prev: ['default'], next: ['case'] },
  ],
  'no-void': ['error', { allowAsStatement: true }], // This allows us to write `void myAsyncFunction()`
  'no-console': 'error',
  // React
  'react/display-name': 'warn',
  'react/jsx-uses-react': 'off',
  'react/react-in-jsx-scope': 'off',
  'react/no-unstable-nested-components': ['warn', { allowAsProps: true }],
  'react/no-string-refs': 'warn',
  'react/prop-types': 'off',
  'react/function-component-definition': [
    'error',
    { namedComponents: 'arrow-function' },
  ],
  'react-hooks/rules-of-hooks': 'error',
  'react-hooks/exhaustive-deps': 'warn',
  'react/jsx-props-no-spreading': 'off',
  'react/jsx-filename-extension': ['error', { extensions: ['.jsx', '.tsx'] }],
  'import/no-default-export': 'off',
  'import/prefer-default-export': 'off',
  'import/no-extraneous-dependencies': [
    'error',
    { devDependencies: ['**/*.test.*', 'jest.*'] },
  ],
  'react/no-unescaped-entities': 'off',
  // Disabled rules (painful / not relevant)
  'react/require-default-props': 'off', // does not play well with typescript
  'no-useless-return': 'off', // clashes with tsconfig.noImplicitReturns
  'eslint-comments/no-unused-enable': 'off',
  'no-param-reassign': 'off',
  'jsx-a11y/anchor-is-valid': 'off', // does not play well with Next Link
  'consistent-return': 'off', // clashes with TS
};

module.exports = {
  extends: [
    'airbnb',
    'airbnb/hooks',
    'eslint:recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:prettier/recommended',
    'plugin:@next/next/recommended',
    'plugin:react/jsx-runtime',
    'next/core-web-vitals',
  ],
  plugins: ['jsx-a11y', 'import'],
  env: {
    'jest/globals': true,
    es6: true,
  },
  settings: {
    react: { version: 'detect' },
    'import/parsers': { '@typescript-eslint/parser': ['.ts', '.tsx'] },
    'import/resolver': { typescript: {} },
  },
  rules: commmonRules,
  overrides: [
    {
      // Typescript
      files: ['**/*.ts?(x)'],
      excludedFiles: ['**/*.{test,spec}.ts?(x)', '**/test-utils/**'],
      extends: [
        'airbnb-typescript',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
      ],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        tsconfigRootDir: __dirname,
        project: './tsconfig.json',
      },
      rules: {
        ...commmonRules,
        'no-shadow': 'off', // Overriden by @typescript-eslint/no-shadow
        '@typescript-eslint/no-shadow': 'error',
        '@typescript-eslint/prefer-for-of': 'error',
        '@typescript-eslint/prefer-optional-chain': 'error',
        '@typescript-eslint/prefer-nullish-coalescing': 'error',
        '@typescript-eslint/no-explicit-any': 'error',
        '@typescript-eslint/no-unnecessary-boolean-literal-compare': 'error',
        '@typescript-eslint/no-unnecessary-type-arguments': 'error',
        '@typescript-eslint/prefer-string-starts-ends-with': 'error',
        '@typescript-eslint/switch-exhaustiveness-check': 'error',
        '@typescript-eslint/no-unused-vars': 'error',
        '@typescript-eslint/unified-signatures': 'error',
        '@typescript-eslint/naming-convention': 'off',
        '@typescript-eslint/no-unsafe-argument': 'off',
        '@typescript-eslint/no-unsafe-assignment': 'off',
        '@typescript-eslint/no-unsafe-call': 'off',
        '@typescript-eslint/no-unsafe-member-access': 'off',
        '@typescript-eslint/no-misused-promises': [
          'error',
          { checksVoidReturn: false },
        ],
        '@typescript-eslint/ban-ts-comment': 'off',
        '@typescript-eslint/no-unnecessary-condition': 'off',
        '@typescript-eslint/indent': 'off',
        '@typescript-eslint/restrict-plus-operands': 'off',
        '@typescript-eslint/restrict-template-expressions': [
          'off',
          { allowNumber: true, allowBoolean: true },
        ],
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/strict-boolean-expressions': 'off',
      },
    },
    {
      // Tests
      files: ['**/*.{test,spec,e2e}.{js,jsx,ts,tsx}', '**/test-utils/**'],
      extends: [
        'plugin:jest-formatting/strict',
        'plugin:jest/recommended',
        'plugin:jest/style',
        'plugin:testing-library/react',
      ],
      plugins: ['jest', 'jest-formatting', 'testing-library'],
      rules: {
        ...commmonRules,
        'no-console': 'off',
        'no-restricted-imports': 'off',
        'jest/consistent-test-it': ['error', { fn: 'it' }],
        'jest/prefer-lowercase-title': ['error', { ignore: ['describe'] }],
        'jest/require-top-level-describe': 'error',
        'jest/no-standalone-expect': 'off',
        'react/jsx-no-constructed-context-values': 'off',
        'react/display-name': 'off',
      },
    },
  ],
};
