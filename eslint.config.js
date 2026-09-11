const js = require('@eslint/js');
const globals = require('globals');
const react = require('eslint-plugin-react');
const jsxA11y = require('eslint-plugin-jsx-a11y');
const prettier = require('eslint-config-prettier');

module.exports = [
  { ignores: ['public/**', '.cache/**', 'node_modules/**'] },
  js.configs.recommended,
  react.configs.flat.recommended,
  jsxA11y.flatConfigs.recommended,
  { settings: { react: { version: 'detect' } } },
  {
    files: ['src/**/*.js'],
    ignores: ['src/config.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      // process/require are substituted by webpack at build time
      globals: { ...globals.browser, process: 'readonly', require: 'readonly' },
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    rules: {
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      // `prefix` is a valid RDFa attribute on <html>
      'react/no-unknown-property': ['error', { ignore: ['prefix'] }],
    },
  },
  {
    files: ['gatsby-*.js', '*.config.js', 'src/config.js', 'scripts/**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'commonjs',
      globals: globals.node,
    },
  },
  prettier,
];
