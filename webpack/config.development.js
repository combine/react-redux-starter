const baseConfig = require('./config.base');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const plugins = [
  new ExtractTextPlugin('styles.css')
];

const loaders = [{
  test: /\.scss$/,
  loader: ExtractTextPlugin.extract('css!sass')
}, {
  test: /\.jsx$|\.js$/,
  loader: 'babel',
  exclude: /node_modules/
}];

module.exports = Object.assign({}, baseConfig, {
  eslint: { configFile: './.eslintrc' },
  devtool: 'source-map',
  plugins: [
    ...baseConfig.plugins,
    ...plugins
  ],
  module: Object.assign({}, baseConfig.module, {
    loaders: [
      ...baseConfig.module.loaders,
      ...loaders
    ]
  })
});
