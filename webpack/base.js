const isDev = process.env.NODE_ENV === 'development';
if (isDev) require('dotenv').load();

import yn from 'yn';
import path from 'path';
import webpack from 'webpack';
import mapValues from 'lodash/mapValues';
import IsoPlugin from 'webpack-isomorphic-tools/plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import { ReactLoadablePlugin } from 'react-loadable/webpack';
import config from '../config';

const ssr = yn(process.env.SSR) || false;
const isoPlugin = new IsoPlugin(config.isomorphicConfig).development(isDev);
const extractTextPlugin = new ExtractTextPlugin({
  filename: isDev ? '[name].css' : '[name].[contenthash].css',
  allChunks: true,
  disable: ssr
});
const plugins = [
  isoPlugin,
  extractTextPlugin,
  new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /en|es/),
  new webpack.DefinePlugin({
    'process.env': config.clientEnv
  }),
  new ReactLoadablePlugin({
    filename: path.join(__dirname, '..', 'react-loadable.json')
  })
];

if (process.env.ANALYZE) {
  plugins.push(new BundleAnalyzerPlugin());
}

export default {
  context: path.resolve(__dirname, '..'),
  entry: {
    app: ['./client/index']
  },
  output: {
    path: path.join(__dirname, '..', process.env.PUBLIC_OUTPUT_PATH),
    filename: '[name].bundle.js',
    chunkFilename: '[name].bundle.js',
    publicPath: process.env.PUBLIC_ASSET_PATH || '/'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.scss'],
    alias: mapValues(config.clientResolvePaths, str =>
      path.join(process.cwd(), ...str.split('/'))
    )
  },
  module: {
    rules: [
      {
        test: /\.jsx$|\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        // For all .scss files that should be modularized. This should exclude
        // anything inside node_modules and everything inside common/css/base
        // since they should be globally scoped.
        test: /\.scss$/,
        exclude: [
          path.resolve(__dirname, '../node_modules'),
          path.resolve(__dirname, '../common/css/base')
        ],
        use: ['css-hot-loader'].concat(
          extractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              {
                loader: 'css-loader',
                options: {
                  modules: true,
                  minimize: false,
                  importLoaders: 1,
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
          })
        )
      },
      {
        // for .scss modules that need to be available globally, we don't pass
        // the files through css-loader to be modularized.
        test: /\.scss$/,
        include: [
          path.resolve(__dirname, '../node_modules'),
          path.resolve(__dirname, '../common/css/base')
        ],
        use: ['css-hot-loader'].concat(
          extractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              { loader: 'postcss-loader' },
              { loader: 'sass-loader' },
              {
                loader: 'sass-resources-loader',
                options: {
                  resources: './common/css/resources/*.scss'
                }
              }
            ]
          })
        )
      },
      {
        test: /\.css$/,
        use: extractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'postcss-loader']
        })
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: isoPlugin.regular_expression('images'),
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10240
            }
          }
        ]
      },
      {
        // Load fonts using file-loader
        test: /\.(ttf|eot|woff2?)$/,
        loader: 'file-loader'
      }
    ]
  },
  plugins
};
