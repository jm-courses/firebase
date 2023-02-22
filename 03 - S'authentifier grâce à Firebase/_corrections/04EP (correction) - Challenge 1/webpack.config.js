const path = require('path');

module.exports = {
  entry: {
    index: './public/scripts/index.js',
    authentication: './public/scripts/authentication.js',
  },
  output: {
    path: path.resolve(__dirname, 'public', 'bundle'),
    filename: '[name].js',
  },
  mode: process.env.NODE_ENV,
  watch: true,
  experiments: {
    topLevelAwait: true,
  },
  devtool: 'source-map',
};
