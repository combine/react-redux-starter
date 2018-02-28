// cache the main layout template with lodash
import { template } from 'lodash';
import { Helmet } from 'react-helmet';

const { NODE_ENV } = process.env;
const compile = template(require('@templates/layouts/application.html'));
const env = NODE_ENV || 'development';

export default function render(html, initialState = {}, bundles = []) {
  if (env === 'development') {
    global.ISOTools.refresh();
  }

  const assets = global.ISOTools.assets();
  const appJs = assets.javascript.app;
  const vendorJs = assets.javascript.vendor;
  const helmet = Helmet.renderStatic();
  const appCss = assets.styles.app;
  const vendorCss = assets.styles.vendor;
  const chunkCss = bundles.filter(bundle => bundle.file.match(/.css/));
  const chunkJs = bundles.filter(bundle => bundle.file.match(/.js/));

  return compile({
    html,
    helmet,
    appCss,
    appJs,
    vendorJs,
    vendorCss,
    chunkCss,
    chunkJs,
    initialState
  });
}
