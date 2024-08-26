/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */
const config = {
    plugins: [
        'prettier-plugin-organize-imports',
        'prettier-plugin-pkg',
        'prettier-plugin-tailwindcss',
    ],
    tailwindFunctions: ['clsx', 'cn', 'cva'],
    trailingComma: 'all',
    printWidth: 100,
    tabWidth: 4,
    semi: true,
    singleQuote: true,
    arrowParens: 'always',
};

export default config;
