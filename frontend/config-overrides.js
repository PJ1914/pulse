// config-overrides.js
const { override, addWebpackModuleRule, ignoreWarnings } = require('customize-cra');

module.exports = override(
    addWebpackModuleRule({
        test: /\.js$/,
        enforce: 'pre',
        use: ['source-map-loader'],
        exclude: /node_modules/,
    }),
    ignoreWarnings([
        // Ignore warnings about source maps
        /Failed to parse source map/
    ])
);
