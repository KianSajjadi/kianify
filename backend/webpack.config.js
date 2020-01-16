const path = require('path');

module.exports = {
  entry: {
    shopifyBackend: './shopify_backend/index.ts',
  },
  target: 'node',
  output: {
    publicPath: '/',
    path: path.resolve(__dirname, './build'),
    filename: '[name].bundle.js',
    chunkFilename: '[name]__[id].js',
  },
  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.ts', '.tsx'],
  },
  plugins: [],
  devtool: 'source-map',
  devServer: {
    // for ngrok compatibility
    disableHostCheck: true,
    port: process.env.DEV_PORT || 3000,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['source-map-loader'],
      },
      {
        test: /\.(ts|tsx)$/,
        use: ['awesome-typescript-loader'],
      },
    ],
  },
};