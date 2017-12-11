const autoprefixer = require('autoprefixer');
const csso = require('postcss-csso')({ restructure: true, comments: false });

const pluginsList = [autoprefixer];
if (process.env.NODE_ENV === 'production') {
  pluginsList.push(csso);
}
module.exports = {
  plugins: pluginsList
};