module.exports = {
  env: { browser: true, es2020: true },
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'prettier',
  ],
  plugins: ['react', '@typescript-eslint', 'react-hooks', 'import'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['react-refresh', 'react', '@typescript-eslint', 'react-hooks', 'import'],
  rules: {
    'react-refresh/only-export-components': 'warn',
  },

  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['@', './src'],
          ['@modules', './src/modules'],
          ['@app', './src/app'],
          ['@models', './src/models'],
          ['@shared', './src/shared'],
        ],
        extensions: ['.ts', '.tsx', '.json', '.svg', '.png', '.scss', '.css'],
      },
    },
  },
};
