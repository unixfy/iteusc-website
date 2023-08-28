module.exports = {
	root: true,
	extends: ['eslint:recommended'],
	plugins: ['svelte'],
	overrides: [{ files: ['*.svelte'], processor: 'svelte/svelte' }],
	parserOptions: {
		sourceType: 'module',
		ecmaVersion: 2020
	},
	env: {
		browser: true,
		es2017: true,
		node: true
	}
};
