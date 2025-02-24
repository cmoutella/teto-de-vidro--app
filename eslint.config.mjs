import { fixupConfigRules, fixupPluginRules } from '@eslint/compat'
import { FlatCompat } from '@eslint/eslintrc'
import js from '@eslint/js'
import typescriptEslint from '@typescript-eslint/eslint-plugin'
import _import from 'eslint-plugin-import'
import importHelpers from 'eslint-plugin-import-helpers'
import jestPlugin from 'eslint-plugin-jest'
import jsxA11Y from 'eslint-plugin-jsx-a11y'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import unusedImports from 'eslint-plugin-unused-imports'
import globals from 'globals'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import tseslint from 'typescript-eslint'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all
})

const patchedConfig = fixupConfigRules([
  {
    ignores: [
      '**/build/**',
      '**/out/**',
      '**/public/scripts/**',
      '.lintstagedrc.js',
      'next.config.js',
      'commitlint.config.js',
      'changelog.config.cjs',
      'createLayout.js',
      'createBSLayout.js',
      'src/brand-system',
      'src/loaders/pixels-loader.tsx',
      'src/loaders/scripts-loader.tsx',
      '**/functions/**',
      '**/.vercel/**'
    ]
  },
  ...compat.extends(
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:@next/next/recommended'
  ),
  {
    plugins: {
      react,
      '@typescript-eslint': typescriptEslint,
      'jsx-a11y': jsxA11Y,
      'react-hooks': fixupPluginRules(reactHooks),
      import: fixupPluginRules(_import),
      'unused-imports': unusedImports,
      'import-helpers': importHelpers
    },

    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.jest,
        ...globals.node,
        process: true
      },

      parser: tseslint.parser,
      ecmaVersion: 12,
      sourceType: 'module',

      parserOptions: {
        ecmaFeatures: {
          jsx: true,
          tsx: true
        }
      }
    },

    settings: {
      react: {
        version: 'detect'
      }
    },

    files: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx'],

    rules: {
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrors: 'none'
        }
      ],
      'no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrors: 'none'
        }
      ],

      'import-helpers/order-imports': [
        'warn',
        {
          newlinesBetween: 'always',

          groups: ['/^react/', '/^@react/', 'module', '/^@\\//', ['parent', 'sibling', 'index']],

          alphabetize: {
            order: 'asc',
            ignoreCase: true
          }
        }
      ],

      'jsx-a11y/alt-text': [
        'warn',
        {
          elements: ['img'],
          img: ['Image']
        }
      ],

      'jsx-a11y/aria-props': 'warn',
      'jsx-a11y/aria-proptypes': 'warn',
      'jsx-a11y/aria-unsupported-elements': 'warn',
      'jsx-a11y/role-has-required-aria-props': 'warn',
      'jsx-a11y/role-supports-aria-props': 'warn',
      'next/no-img-element': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/no-unescaped-entities': 'off',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'react/prop-types': 'off',
      'unused-imports/no-unused-imports': 'error',
      'react/jsx-props-no-spreading': 'off',
      'react/no-array-index-key': 'off',

      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          prefer: 'type-imports',
          disallowTypeAnnotations: true,
          fixStyle: 'separate-type-imports'
        }
      ],
      '@typescript-eslint/no-unused-expressions': 'off'
    }
  },
  {
    // disable type-aware linting on JS files
    files: ['**/*.js'],
    ...tseslint.configs.disableTypeChecked
  },
  {
    // enable jest rules on test files
    files: ['test/**'],
    ...jestPlugin.configs['flat/recommended']
  }
])

const config = [
  ...patchedConfig,
  // Add more flat configs here
  { ignores: ['.next/*'] }
]

export default config
