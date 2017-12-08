import yn from 'yn';
import path from 'path';
import webpack from 'webpack';
import mapValues from 'lodash/mapValues';
import isomorphicConfig from './isomorphic';
import IsomorphicPlugin from 'webpack-isomorphic-tools/plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import {
  ANALYZE, NODE_ENV, WEBPACK_OUTPUT_PATH, ASSET_URL, RESOLVE_PATHS,
  CSS_MODULES_IDENTIFIER, CLIENT_ENV_VARS
} from './constants';

const hot = yn(process.env.HOT) || false;
const isDev = NODE_ENV === 'development';
const isomorphicPlugin = new IsomorphicPlugin(isomorphicConfig).development(isDev);
const extractText = new ExtractTextPlugin({
  filename: '[name].[contenthash].css',
  disable: process.env.NODE_ENV === 'development' && hot
});

const plugins = [
  isomorphicPlugin,
  extractText,
  new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /en|es/),
  new webpack.DefinePlugin({
    'process.env': CLIENT_ENV_VARS
  })
];

if (ANALYZE) { plugins.push(new BundleAnalyzerPlugin()); }

export default {
  context: path.resolve(__dirname, '..'),
  entry: {
    vendor: [
      './client/vendor'
    ],
    app: [
      './client/index'
    ]
  },
  output: {
    path: path.join(__dirname, ('../' + WEBPACK_OUTPUT_PATH)),
    filename: '[name].js',
    publicPath: `${ASSET_URL}/`
  },
  resolve: {
    extensions: ['.js', '.jsx', '.scss'],
    alias: mapValues(RESOLVE_PATHS, (str) => (
      path.join(process.cwd(), ...str.split('/'))
    ))
  },
  module: {
    rules: [
      {
        test: /\.jsx$|\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          // NOTE: presets are configured in .babelrc rather than here.
          // presets: []
          cacheDirectory: true
        }
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
        use: extractText.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: true,
                minimize: false,
                importLoaders: 1,
                localIdentName: CSS_MODULES_IDENTIFIER
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
      },
      {
        // for .scss modules that need to be available globally, we don't pass
        // the files through css-loader to be modularized.
        test: /\.scss$/,
        include: [
          path.resolve(__dirname, '../node_modules'),
          path.resolve(__dirname, '../common/css/base')
        ],
        use: extractText.extract({
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
      },
      {
        test: /\.css$/,
        use: extractText.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'postcss-loader'],
        })
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: isomorphicPlugin.regular_expression('images'),
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
