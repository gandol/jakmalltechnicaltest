module.exports = {
    root: true,
    extends: "@react-native-community",
    parser: "@typescript-eslint/parser",
    plugins: ["@typescript-eslint"],
    overrides: [
        {
            files: ["*.ts", "*.tsx", "*.js"],
            rules: {
                "react-hooks/exhaustive-deps": "off",
                "@typescript-eslint/no-shadow": ["error"],
                "no-shadow": "off",
                "no-undef": "off",
                quotes: "off",
                indent: ["error", 4],
                "react-native/no-inline-styles": "off",
            },
        },
    ],
};
