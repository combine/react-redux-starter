import webpack from 'webpack';
import baseConfig from './base';
import CompressionPlugin from 'compression-webpack-plugin';
import UglifyJSPlugin from 'uglifyjs-webpack-plugin';
import merge from 'webpack-merge';
import config from '../config';

const commonsChunkPlugin = new webpack.optimize.CommonsChunkPlugin({
  name: 'vendor',
  filename: '[name].[hash].js',
  minChunks: module => /node_modules/.test(module.resource)
});

export default merge(baseConfig, {
  output: {
    filename: '[name].[hash].js'
  },
  plugins: [
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.BannerPlugin({
      banner:
        'hash:[hash], chunkhash:[chunkhash], name:[name], ' +
        'filebase:[filebase], query:[query], file:[file]'
    }),
    new UglifyJSPlugin({
      uglifyOptions: {
        compress: {
          warnings: false
        },
        mangle: true,
        output: {
          comments: false
        },
        sourceMap: true
      }
    }),
    new CompressionPlugin({
      asset: '[file].gz',
      algorithm: 'gzip',
      test: /\.css$|\.js$|\.html$/,
      threshold: 10240,
      minRatio: 0.8
    }),
    ...(!config.enableDynamicImports ? [commonsChunkPlugin] : [])
  ]
});
