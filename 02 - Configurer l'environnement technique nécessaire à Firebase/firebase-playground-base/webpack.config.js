const path = require('path');

module.exports = {
  entry: {},
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
