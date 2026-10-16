import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
export default tseslint.config({ignores:['dist','node_modules']},js.configs.recommended,...tseslint.configs.recommended,{files:['**/*.{ts,tsx}'],languageOptions:{globals:globals.browser},plugins:{'react-hooks':reactHooks,'react-refresh':reactRefresh},rules:{...reactHooks.configs.recommended.rules,...reactRefresh.configs.vite.rules}},{files:['scripts/*.mjs','eslint.config.js'],languageOptions:{globals:globals.node}})
