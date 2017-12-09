import webpack from 'webpack';
import baseConfig from './base';
import CompressionPlugin from 'compression-webpack-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import UglifyJSPlugin from 'uglifyjs-webpack-plugin';
let pathsToClean = [
  'dist',
];

// the clean options to use
let cleanOptions = {
  root: '/var/www/react/',
  verbose: true,
  dry: false,
};
const plugins = [
  new CleanWebpackPlugin(pathsToClean, cleanOptions),
  new webpack.BannerPlugin({
    banner: 'hash:[hash], chunkhash:[chunkhash], name:[name], filebase:[filebase], query:[query], file:[file]',
  }),
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    filename: '[name].[hash].js',
    minChunks: module => /node_modules/.test(module.resource)
  }),
  new webpack.optimize.AggressiveMergingPlugin(),
  new webpack.optimize.ModuleConcatenationPlugin(),
  new UglifyJSPlugin({
    uglifyOptions: {
      compress: {
        warnings: false
      },
      mangle: true,
      output: {
        comments: false,
      },
    }
  }),
  new CompressionPlugin({
    asset: '[file].gz',
    algorithm: 'gzip',
    test: /\.css$|\.js$|\.html$/,
    threshold: 10240,
    minRatio: 0.8
  })
];

const loaders = [];

export default {
  ...baseConfig,
  output: { ...baseConfig.output, ...{
    filename: '[name].[hash].js'
  }},
  plugins: [
    ...baseConfig.plugins,
    ...plugins
  ],
  module: { ...baseConfig.module, ...{
    rules: [
      ...baseConfig.module.rules,
      ...loaders
    ]
  }}
};
