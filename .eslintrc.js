module.exports = {
    parser: '@typescript-eslint/parser',
    plugins: [
        '@typescript-eslint',
    ],
    settings: {
        'import/resolver': {
            node: {
                extensions: ['.ts', '.tsx'],
                moduleDirectory: ['node_modules', 'src/'],
            },
        },
    },
    parserOptions: { sourceType: 'module' },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
    ],
    rules: {
        'import/no-unresolved': 0,
        'object-curly-newline': ['error', { 'multiline': true, 'consistent': true }],
        'import/prefer-default-export': 'off',
        'semi-spacing': ['error', { 'before': false, 'after': true }],
        'key-spacing': ['error', { 'beforeColon': false, 'afterColon': true, 'mode': 'strict' }],
        '@typescript-eslint/type-annotation-spacing': ['error', { 'before': false, 'after': true }],
        'semi': [2, 'always'],
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': ['error'],
        'quotes': ['error', 'single'],
        'object-curly-spacing': ['error', 'always'],
        'indent': ['error', 4],
    }
};
