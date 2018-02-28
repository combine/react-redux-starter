import './registerAliases';
import fs from 'fs';
import path from 'path';
import config from '@config';
import Loadable from 'react-loadable';
import chokidar from 'chokidar';

const env = process.env.NODE_ENV || 'development';

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

  if (!global.ISOTools) {
    configureIsomorphicTools(server);
  }

  return Loadable.preloadAll().then(() => {
    return server.listen(port, error => {
      if (error) {
        console.error(error);
      } else {
        console.info(`Application server mounted on http://localhost:${port}.`);
      }
    });
  });
};

// This check is required to ensure we're not in a test environment.
if (!module.parent) {
  let server;

  if (!config.enableDynamicImports) {
    startServer();
  } else {
    // Ensure react-loadable stats file exists before starting the server
    const statsPath = path.join(__dirname, '..', 'react-loadable.json');
    const watcher = chokidar.watch(statsPath, { persistent: true });

    console.info(`Checking/waiting for ${statsPath}...`);

    watcher.on('all', (event, path) => {
      if (event === 'add') {
        if (env === 'production') {
          watcher.close();
        }

        console.info(`Stats file found at ${path}, starting server...`);

        startServer().then(s => server = s);

      } else if (event === 'change') {
        if (env === 'production') {
          watcher.close();
        }

        console.info('Stats file changed, restarting server...');

        if (server) {
          // if the server is already started, restart it.
          server.close(() => {
            startServer().then(s => server = s);
          });
        } else {
          // otherwise, just start the server.
          startServer().then(s => server = s);
        }
      }
    });
  }
}
