const path = require('path');
const webpack = require('webpack');
const isomorphicConfig = require('./config.isomorphic');
const IsomorphicPlugin = require('webpack-isomorphic-tools/plugin');
const host = require('./host.devserver');

const isDev = process.env.NODE_ENV === 'development';
const isomorphicPlugin = new IsomorphicPlugin(isomorphicConfig).development(isDev);


module.exports = {
  context: path.resolve(__dirname, '..'),
  entry: [
    './client/index'
  ],
  output: {
    path: path.join(__dirname, ('../' + host.OUTPUT_PATH)),
    filename: 'bundle.js',
    publicPath: host.ASSET_HOST
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.scss']
  },
  module: {
    preLoaders: [{
      test: /\.jsx$|\.js$/,
      loader: 'eslint-loader',
      exclude: /node_modules/
    }],
    loaders: [{
      test: /\.json$/,
      loader: 'json'
    }, {
      test: isomorphicPlugin.regular_expression('images'),
      loader: 'url-loader?limit=10240'
    }, {
      test: /\.(woff(2)?|eot|ttf|svg)(\?[a-z0-9=\.]*)?$/,
      loader: 'file'
    }, {
      test: /\.css?$/,
      loaders: ['style', 'raw']
    }]
  },
  plugins: [
    isomorphicPlugin,
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en|es/),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      }
    })
  ]
};
