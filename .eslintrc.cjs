module.exports = {
	root: true,
	env: {
        browser: true,
        es2021: true,
        node: true, // for config files
    },
	extends: [
		'eslint:recommended', 
		'plugin:@typescript-eslint/recommended'
	],
	parser: '@typescript-eslint/parser',
    plugins: ['svelte3', '@typescript-eslint'],
	parserOptions: {
        ecmaVersion: 12,
        sourceType: 'module',
        tsconfigRootDir: __dirname,
        project: ['./tsconfig.json'],
        extraFileExtensions: ['.svelte']
    },
    settings: {
        'svelte3/typescript': require('typescript'),
        // ignore style tags in Svelte because of Tailwind CSS
        // See https://github.com/sveltejs/eslint-plugin-svelte3/issues/70
        'svelte3/ignore-styles': () => true
    },
	ignorePatterns: ['node_modules', '*.cjs'],
	overrides: [
        {
            files: ['**/*.svelte'],
            processor: 'svelte3/svelte3',
            env: { browser: true, node: false },

        },
        {
            files: ['*.ts'], // Your TypeScript files extension
            parserOptions: {
                project: ['./tsconfig.json'], // Specify it only for TypeScript files
            },
        }
    ],
};
