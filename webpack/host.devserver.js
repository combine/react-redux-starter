const OUTPUT_PATH = 'dist/';
const PORT = process.env.PORT || 3001;
const HOSTNAME = process.env.HOSTNAME || 'localhost';
const URL = 'http://' + HOSTNAME + ':' + PORT;
const ASSET_HOST = process.env.ASSET_HOST || (URL+ '/' + OUTPUT_PATH);

module.exports = {
  OUTPUT_PATH,
  PORT,
  HOSTNAME,
  URL,
  ASSET_HOST
};
