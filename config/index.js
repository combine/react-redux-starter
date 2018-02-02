const { mapValues, keyBy } = require('lodash');

module.exports = {
  // The env vars to expose on the client side. If you add them here, they will
  // be available on the client as process.env[VAR_NAME], same as they would be
  // in node.js.
  //
  // **WARNING**: Be careful not to expose any secrets here!
  clientEnv: mapValues(
    keyBy([
      'NODE_ENV',
      'APPLICATION_BASE_URL'
    ]),
    (env) => JSON.stringify(process.env[env])
  ),

  /* The identifier to use for css-modules.
   */
  cssModulesIdentifier: '[name]__[local]__[hash:base64:5]',

  /* Paths for webpack to resolve into non-relative directories, so that instead
   * of having to use relative paths:
   *
   * import SomeComponents from '../../../../SomeComponent';
   *
   * we can write this instead:
   *
   * import SomeComponent from 'components/SomeComponent';
   */
  clientResolvePaths: {
    actions: 'common/js/actions',
    components: 'common/js/components',
    constants: 'common/js/constants',
    containers: 'common/js/containers',
    css: 'common/css',
    fonts: 'common/fonts',
    images: 'common/images',
    lib: 'common/js/lib',
    pages: 'common/js/pages',
    reducers: 'common/js/reducers',
    routes: 'common/js/routes',
    store: 'common/js/store',
    templates: 'common/templates'
  },

  serverResolvePaths: {
    api: 'server/api',
    constants: 'common/js/constants',
    middleware: 'server/middleware'
  },

  // Isomorphic configuration
  isomorphicConfig: {
    assets: {
      images: {
        extensions: [
          'png',
          'jpg',
          'jpeg',
          'gif',
          'ico',
          'svg'
        ]
      }
    }
  }
};
