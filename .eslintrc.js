module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint', 'react', 'prettier'],
    extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:react/recommended',
      'plugin:react-hooks/recommended',
      'prettier',
      'prettier/@typescript-eslint',
      'prettier/react',
    ],
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      // Add any additional rules or overrides here
      'prettier/prettier': 'error',
    },
  };
  