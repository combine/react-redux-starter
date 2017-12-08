import { mapValues, keyBy } from 'lodash';

/* The following are environment variables imported from .env, and their
 * defaults. Here, we destructure them from process.env and then export them as
 * constants.
 */
export const {
  NODE_ENV, DEV_SERVER_PORT, DEV_SERVER_HOSTNAME, WEBPACK_OUTPUT_PATH,
  ASSET_HOST, ASSET_PATH, ANALYZE, APPLICATION_BASE_URL, DEV_SERVER_HOST_URL
} = process.env;

// The env vars to expose on the client side.
export const CLIENT_ENV_VARS = mapValues(
  keyBy([
    // All CLIENT env vars that you wish to expose go here
    // WARNING: Be careful not to expose any secrets here!
    'NODE_ENV',
    'APPLICATION_BASE_URL'
  ]),
  (env) => JSON.stringify(process.env[env])
);

// The URL of the dev server including the hostname and port

// The asset host to use for webpack files. In development, we will always use
// the dev server's URL.
export const ASSET_URL = (
  NODE_ENV === 'development'
    ? `${DEV_SERVER_HOST_URL}${WEBPACK_OUTPUT_PATH}`
    : ASSET_HOST
);

/* The identifier to use for css-modules.
 */
export const CSS_MODULES_IDENTIFIER = '[name]__[local]__[hash:base64:5]';

/* Paths for webpack to resolve into non-relative directories, so that instead
 * of having to use relative paths:
 *
 * import SomeComponents from '../../../../SomeComponent';
 *
 * we can write this instead:
 *
 * import SomeComponent from 'components/SomeComponent';
 */
export const RESOLVE_PATHS = {
  actions: 'common/js/actions',
  components: 'common/js/components',
  constants: 'common/js/constants',
  containers: 'common/js/containers',
  css: 'common/css',
  fonts: 'common/fonts',
  images: 'common/images',
  helper: 'common/js/helper',
  pages: 'common/js/pages',
  reducers: 'common/js/reducers',
  routes: 'common/js/routes',
  store: 'common/js/store',
  templates: 'common/templates'
};

export const SERVER_RESOLVE_PATHS = {
  api: 'server/api',
  auth: 'server/auth',
  models: 'server/models',
  services: 'server/services',
  constants: 'common/js/constants',
  lib: 'server/lib'
};
