module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'plugin:react/recommended',
    'standard-with-typescript'
  ],
  overrides: [
    {
      files: '*.d.ts',
      rules: {
        '@typescript-eslint/triple-slash-reference': ['error', { types: 'prefer-import' }]
      }
    },
    {
      files: '*.tsx',
      rules: {
        'react/react-in-jsx-scope': 'off'
      }
    }
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['tsconfig.json', 'tsconfig.node.json']
  },
  plugins: [
    'react'
  ],
  rules: {
  },
  settings: {
    react: {
      version: 'detect'
    }
  }
}
