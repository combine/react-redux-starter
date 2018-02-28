export default {
  babelrc: false,
  presets: [
    [
      'env',
      {
        targets: {
          node: 'current',
          uglify: true
        }
      }
    ],
    'react'
  ],
  plugins: [
    'react-loadable/babel',
    'transform-es2015-modules-commonjs',
    'transform-class-properties',
    'transform-export-extensions',
    'transform-object-rest-spread',
    'syntax-dynamic-import'
  ],
  env: {
    development: {
      plugins: []
    },
    production: {
      plugins: ['transform-react-remove-prop-types']
    }
  }
};
