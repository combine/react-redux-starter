const fs = require('fs');
const path = require('path');
const config = require('../config');
const env = process.env.NODE_ENV || 'development';
const { addPath } = require('app-module-path');

global.__basedir = __dirname;

// Lets us access module paths inside this server directory.
addPath(path.join(__dirname));

// Adds common/js to the app module path so we can access local modules without
// having to use relative paths on the server-side. This is done on the client
// side using webpack's `resolve`.
addPath(path.join(__dirname, '../server'));
addPath(path.join(__dirname, '../common'));
addPath(path.join(__dirname, '../common/js'));

// HTML files are read as pure strings
require.extensions['.html'] = (module, filename) => {
  module.exports = fs.readFileSync(filename, 'utf8');
};

if (env === 'development') {
  require('dotenv').load();

  // In development, we compile css-modules on the fly on the server. This is
  // not necessary in production since we build renderer and server files with
  // webpack and babel.
  require('css-modules-require-hook')({
    extensions: ['.scss'],
    generateScopedName: config.cssModulesIdentifier,
    devMode: true
  });

  // Add better stack tracing for promises in dev mode
  process.on('unhandledRejection', r => console.log(r));
}

const configureIsomorphicTools = function(server) {
  // configure isomorphic tools
  // this must be equal to the Webpack configuration's "context" parameter
  const basePath = path.resolve(__dirname, '..');
  const ISOTools = require('webpack-isomorphic-tools');

  // this global variable will be used later in express middleware
  global.ISOTools = new ISOTools(config.isomorphicConfig).server(
    basePath,
    () => server
  );
};

const startServer = () => {
  const server = require('./server');
  const port = process.env.PORT || process.env.APPLICATION_PORT || 3000;

  // Only run if there is no parent module (i.e. this is being required by a
  // test module).
  if (!module.parent) {
    configureIsomorphicTools(server);

    server.listen(port, error => {
      if (error) {
        console.error(error);
      } else {
        console.info(`Application server mounted on http://localhost:${port}.`);
      }
    });
  }

  return server;
};

module.exports = startServer();
