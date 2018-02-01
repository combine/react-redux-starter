import webpack from 'webpack';
import baseConfig from './production.babel';
import CompressionPlugin from 'compression-webpack-plugin';
import UglifyJSPlugin from 'uglifyjs-webpack-plugin';

const plugins = [
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
      }
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
  output: {
    ...baseConfig.output,
    ...{
      filename: '[name].[hash].js',
      chunkFilename: '[name].[hash].js',
    }
  },
  plugins: [...baseConfig.plugins, ...plugins],
  module: {
    ...baseConfig.module,
    ...{
      rules: [...baseConfig.module.rules, ...loaders]
    }
  }
};
