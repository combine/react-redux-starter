import webpack from 'webpack';
import baseConfig from './base';

const plugins = [
  ...baseConfig.plugins,
  new webpack.optimize.AggressiveMergingPlugin(),
  new webpack.optimize.ModuleConcatenationPlugin(),
];

const loaders = [];

export default {
  ...baseConfig,
  output: {
    ...baseConfig.output,
    ...{
      filename: '[name].[hash].js'
    }
  },
  plugins,
  module: {
    ...baseConfig.module,
    ...{
      rules: [...baseConfig.module.rules, ...loaders]
    }
  }
};
