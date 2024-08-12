// webpack.config.js
const path = require('path');

module.exports = {
  // Other configurations...
  module: {
    rules: [
      {
        test: /\.obj$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'assets/models/',
              publicPath: 'assets/models/',
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
};
