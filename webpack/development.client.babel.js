/* eslint-disable no-console */
import WebpackDevServer from 'webpack-dev-server';
import webpack from 'webpack';
import baseConfig from './base';
import config from '../config';
import merge from 'webpack-merge';

const {
  DEV_SERVER_PORT,
  DEV_SERVER_HOSTNAME,
  DEV_SERVER_HOST_URL
} = process.env;

const commonsChunkPlugin = new webpack.optimize.CommonsChunkPlugin({
  name: 'vendor',
  filename: '[name].js',
  minChunks: module => /node_modules/.test(module.resource)
});

const webpackConfig = merge(baseConfig, {
  devtool: 'eval',
  entry: {
    app: [
      'webpack-dev-server/client?' + DEV_SERVER_HOST_URL,
      'webpack/hot/only-dev-server'
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.NamedModulesPlugin(),
    ...(!config.enableDynamicImports ? [commonsChunkPlugin] : [])
  ]
});

console.info('Firing up Webpack dev server...\n');

new WebpackDevServer(webpack(webpackConfig), {
  port: DEV_SERVER_PORT,
  publicPath: webpackConfig.output.publicPath,
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
    console.info(`Webpack dev server mounted at ${DEV_SERVER_HOST_URL}.`);
  }
});
