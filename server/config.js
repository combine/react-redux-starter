'use strict';

var env = process.env.NODE_ENV || 'development';
var webpackConfig = require('../webpack/config.' + env);

import p from '../package.json';

export default {
  name: p.name,
  description: p.description,
  version: p.version,

  // launch environment
  port: process.env.PORT || 3000,
  assetHost: process.env.ASSET_HOST || webpackConfig.output.publicPath
};
