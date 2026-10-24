import eslintPluginAstro from 'eslint-plugin-astro';
import tsParser from '@typescript-eslint/parser';

export default [
	{
		ignores: ['dist/', '.astro/', 'node_modules/', 'coverage/', 'cdk/cdk.out/', 'cdk/node_modules/'],
	},
	...eslintPluginAstro.configs['flat/recommended'],
	{
		files: ['**/*.ts'],
		languageOptions: { parser: tsParser },
	},
	{
		rules: {
			'no-console': 'error',
		},
	},
];