/* eslint-disable no-console */
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const baseConfig = require('./config.base');
const host = require('./host.devserver');

const entry = [
  'webpack-dev-server/client?' + host.URL,
  'webpack/hot/only-dev-server'
];

const plugins = [
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoErrorsPlugin()
];

const loaders = [{
  test: /\.scss$/,
  loader: 'style!css!sass'
}, {
  test: /\.jsx$|\.js$/,
  loader: 'babel',
  exclude: /node_modules/,
  // use react-transform to hot reload modules when hot is specified
  query: {
    plugins: [
      ['react-transform', {
        transforms: [{
          transform: 'react-transform-hmr',
          imports: ['react'],
          locals: ['module']
        }, {
          transform: 'react-transform-catch-errors',
          imports: ['react', 'redbox-react']
        }]
      }]
    ]
  }
}];

const config = Object.assign({}, baseConfig, {
  eslint: { configFile: './.eslintrc' },
  devServerPort: host.PORT,
  devtool: 'eval',
  entry: [
    ...entry,
    ...baseConfig.entry
  ],
  plugins: [
    ...plugins,
    ...baseConfig.plugins
  ],
  module: Object.assign({}, baseConfig.module, {
    loaders: [
      ...baseConfig.module.loaders,
      ...loaders
    ]
  })
});

console.info('Firing up Wepback dev server...');

new WebpackDevServer(webpack(config), {
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
  }
}).listen(host.PORT, host.HOSTNAME, function errorCallback(err) {
  if (err) {
    console.error(err);
  } else {
    console.info('🚧 Webpack client dev-server listening on ' + host.URL + ' with publicPath:' + config.output.publicPath);
  }
});
