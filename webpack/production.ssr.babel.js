import webpack from 'webpack';
import baseConfig from './base';
import UglifyJSPlugin from 'uglifyjs-webpack-plugin';
import nodeExternals from 'webpack-node-externals';
import merge from 'webpack-merge';
import path from 'path';
import config from '../config';
import babelOpts from './babel.config.ssr';

const mergeStrategy = {
  entry: 'replace',
  plugins: 'replace',
  module: 'replace'
};

export default merge.strategy(mergeStrategy)(baseConfig, {
  context: null,
  target: 'node',
  entry: ['./server/renderer/handler.js'],
  externals: [
    // images are handled by isomorphic webpack.
    // html files are required directly
    /\.(html|png|gif|jpg)$/,
    // treat all node modules as external to keep this bundle small
    nodeExternals()
  ],
  output: {
    path: path.join(__dirname, '..', process.env.OUTPUT_PATH, 'renderer'),
    filename: 'handler.built.js',
    libraryTarget: 'commonjs'
  },
  plugins: [
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new UglifyJSPlugin({
      sourceMap: true
    }),
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1,
    })
  ],
  module: {
    rules: [
      {
        test: /\.js|jsx$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: babelOpts
        }
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.scss$/,
        exclude: [
          path.resolve(__dirname, '../node_modules'),
          path.resolve(__dirname, '../common/css/base')
        ],
        use: [
          {
            loader: 'css-loader/locals',
            options: {
              modules: true,
              minimize: false,
              importLoaders: 0,
              localIdentName: config.cssModulesIdentifier
            }
          },
          { loader: 'postcss-loader' },
          { loader: 'sass-loader' },
          {
            loader: 'sass-resources-loader',
            options: {
              resources: './common/css/resources/*.scss'
            }
          }
        ]
      }
    ]
  }
});
