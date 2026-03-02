import js from '@eslint/js'
import globals from 'globals'
import { defineConfig } from 'eslint/config'
import stylistic from '@stylistic/eslint-plugin'

export default defineConfig([
  { ignores: ['coverage/**', 'node_modules/**'] },

  stylistic.configs.recommended,

  {
    files: ['**/*.{js,mjs,cjs}'],
    plugins: { js },
    extends: ['js/recommended'],
    languageOptions: { globals: globals.node },
  },

  {
    files: ['**/__tests__/**/*.{js,mjs,cjs}'],
    languageOptions: { globals: globals.jest },
  },
])
