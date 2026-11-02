import js from '@eslint/js';
import svelte from 'eslint-plugin-svelte';
import globals from 'globals';

export default [
	{
		ignores: ['.svelte-kit/', '.wrangler/', 'build/', 'package/', 'static/']
	},
	js.configs.recommended,
	...svelte.configs['flat/recommended'],
	{
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node
			}
		},
		rules: {
			// The site is served from the domain root (no paths.base), so resolve() would be a
			// no-op, and many hrefs are external URLs coming from the CMS.
			'svelte/no-navigation-without-resolve': 'off',
			// Worth fixing gradually, but adding keys changes DOM reconciliation and some queries
			// don't fetch a stable id, so this is a warning rather than a blocking error.
			'svelte/require-each-key': 'warn'
		}
	}
];
