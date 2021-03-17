module.exports = {
  env: {
    browser: false,
    es2021: true,
    node: true,
  },
  extends: [
    'airbnb/base',
    'plugin:@typescript-eslint/recommended',
  ],
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
    'lines-between-class-members': 'off',
    '@typescript-eslint/type-annotation-spacing': ['error', {
      before: false,
      after: false,
    }],
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
};
