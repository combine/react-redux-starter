/* eslint-disable no-console */
import { DEV_SERVER_PORT, DEV_SERVER_HOSTNAME, DEV_SERVER_HOST_URL } from './constants';
import WebpackDevServer from 'webpack-dev-server';
import webpack from 'webpack';
import baseConfig from './base';

// Webpack Entry Point for dev server
const entry = [
  'react-hot-loader/patch',
  'webpack-dev-server/client?' + DEV_SERVER_HOST_URL,
  'webpack/hot/only-dev-server'
];

// Additional plugins
const plugins = [
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    filename: '[name].js',
    minChunks: module => /node_modules/.test(module.resource)
  }),
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoEmitOnErrorsPlugin(),
  new webpack.NamedModulesPlugin()
];

// Additional loaders
const loaders = [];

const config = Object.assign({}, baseConfig, {
  devtool: 'eval',
  entry: Object.assign({}, baseConfig.entry, {
    app: [
      ...entry,
      ...baseConfig.entry.app
    ]
  }),
  plugins: [
    // don't use the first plugin (isomorphic plugin)
    ...baseConfig.plugins.slice(1),
    ...plugins
  ],
  module: Object.assign({}, baseConfig.module, {
    rules: [
      ...baseConfig.module.rules,
      ...loaders
    ]
  })
});

console.info('Firing up Webpack dev server...');

new WebpackDevServer(webpack(config), {
  port: DEV_SERVER_PORT,
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true,
  noInfo: false,
  quiet: false,
  headers: {'Access-Control-Allow-Origin': '*'},
  stats: {
    colors: true,
    hash: false,
    version: false,
    chunks: false,
    children: false
  },
  disableHostCheck: true
}).listen(DEV_SERVER_PORT, DEV_SERVER_HOSTNAME, function errorCallback(err) {
  if (err) {
    console.error(err);
  } else {
    console.info(`Webpack dev server mounted at ${DEV_SERVER_HOST_URL}. Asset path: ${config.output.publicPath}`);
  }
});
