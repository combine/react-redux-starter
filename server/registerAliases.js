import path from 'path';
import moduleAlias from 'module-alias';
import { _moduleAliases } from '../package.json';
import { mapValues } from 'lodash';

// Add module aliases, but for server aliases (prefix by the `$` symbol), change
// the directory to match the current build directory (e.g. /dist)
// This ensures that all alises are properly referencing the babel-built
// server files
moduleAlias.addAliases(mapValues(_moduleAliases, (aliasPath, aliasName) => {
  const sym = aliasName[0];

  if (sym === '$') {
    return path.join(__dirname, aliasPath.split('/').slice(1).join('/'));
  }

  return path.join(__dirname, '..', aliasPath);
}));
