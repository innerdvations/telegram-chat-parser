module.exports = {
  env: {
    browser: false,
    es2021: true,
    node: true,
  },
  extends: [
    'airbnb-base-typescript',
    'plugin:@typescript-eslint/recommended',
  ],
  ignorePatterns: ['**/dist', '**/.git', '**/node_modules', '.eslintrc.js', 'nyc.config.js', '**/data/error*.json'],
  overrides: [{
    env: {
      mocha: true,
    },
    rules: {
      'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
      '@typescript-eslint/no-unused-expressions': 'off',
      'no-unused-expressions': 'off',
    },
    files: ['src/**/*.spec.ts', 'src/**/*.test.ts', 'tests/**/*.ts'],
  }],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  parserOptions: {
    project: ['./tsconfig.json'],
  },
  rules: {
    'import/extensions': ['error', 'ignorePackages', {
      js: 'never',
      jsx: 'never',
      ts: 'never',
      tsx: 'never',
    }],
    '@typescript-eslint/lines-between-class-members': ['error', 'always', { "exceptAfterSingleLine": true }],
    'linebreak-style': ['error', 'unix'],
    'no-underscore-dangle': 'off',
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
