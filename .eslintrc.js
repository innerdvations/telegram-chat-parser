module.exports = {
  env: {
    browser: false,
    es2021: true,
  },
  extends: ['airbnb/base'],
  ignorePatterns: ['**/dist', '**/.git', '**/node_modules'],
  overrides: [{
    env: {
      mocha: true,
    },
    rules: {
      'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
      'no-unused-expressions': 'off',
    },
    files: ['src/**/*.spec.ts', 'src/**/*.test.ts', 'tests/**/*.ts'],
  }],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  // parserOptions: {
  //   ecmaVersion: 12,
  //   sourceType: 'module',
  // },
  rules: {
    'import/extensions': ['error', 'ignorePackages', {
      js: 'never',
      jsx: 'never',
      ts: 'never',
      tsx: 'never',
    }],
    'linebreak-style': ['error', 'unix'],
    'no-underscore-dangle': 'off',
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
};
