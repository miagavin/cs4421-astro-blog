import eslintPluginAstro from "eslint-plugin-astro"
import tsParser from "@typescript-eslint/parser"

export default [
    {
        ignores: [".astro/**", "dist/**"],
    },
    ...eslintPluginAstro.configs.recommended,
    {
        files: ["*.astro", "**/*.astro"],
        languageOptions: {
            parserOptions: {
                parser: tsParser,
            },
        },
    },
]