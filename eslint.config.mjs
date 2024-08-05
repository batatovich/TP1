import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginReact from 'eslint-plugin-react';

export default [
  // Frontend configuration (ESM)
  {
    files: ['frontend/**/*.{js,jsx}'],
    languageOptions: {
      sourceType: 'module', // ESM for frontend
      globals: {...globals.browser},
    },
    ...pluginJs.configs.recommended,
    ...pluginReact.configs.flat.recommended,
  },
  // Backend configuration (CommonJS)
  {
    files: ['backend/**/*.js'],
    languageOptions: {
      sourceType: 'commonjs', // CommonJS for backend
      globals: {...globals.node},
    },
    ...pluginJs.configs.recommended,
  },
  // Test configuration
  {
    files: ['backend/test/**/*.js'],
    languageOptions: {
      globals: {
        ...globals.node,
        mocha: true,
      },
    },
    rules: {
      'no-undef': 'off',
    },
  },
  // General configuration (applies to all files)
  {
    rules: {
      quotes: ['error', 'single'],
      semi: ['error', 'always'],    
    }
  }
];
