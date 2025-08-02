// eslint.config.mjs

export default [
  {
    // You might already have this selector and config
    files: ['*.ts', '*.tsx'],
    languageOptions: {
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: './tsconfig.json',
        sourceType: 'module',
      },
    },
    rules: {
      // Disable no-explicit-any rule globally for TypeScript files
      '@typescript-eslint/no-explicit-any': 'off',

      // possibly other rules you already have...
    },
  },

  // other configs you might have here...
];
