// @ts-check

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginVue from 'eslint-plugin-vue'

export default tseslint.config(
    eslint.configs.recommended,
    tseslint.configs.recommended,
    ...pluginVue.configs['flat/recommended'],
    {
        rules: {
            'indent': ['error', 4],
            'vue/html-indent': ['error', 4],
            'vue/script-indent': ['error', 4],
            'vue/html-quotes': ['error', 'single'],
            'vue/html-closing-bracket-newline': ['error', {
                'singleline': 'never',
                'multiline': 'never',
                'selfClosingTag': {
                    'singleline': 'never',
                    'multiline': 'never',
                }
            }]
        },
        languageOptions: {
            parserOptions: {
                ecmaVersion: 'latest',
                parser: '@typescript-eslint/parser',
            },
        }
    }
);
