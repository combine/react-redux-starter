# react-redux-starter

A universal starter kit built with ES2015, react, react-router and redux. Server
rendering with react and express. Bundled with Webpack with hot module and css
reloading with SCSS support.

## Prerequisites

* Node.js 6+ is **required**, as the Webpack configuration files uses ES2015
extensively.

* Webpack
```
npm install -g webpack
```

* nodemon

```
npm install -g nodemon
```

* eslint, babel-eslint

```
npm install -g eslint babel-eslint
```

## Get started

```
npm install
npm start
```

Direct your browser to `http://localhost:3000`.


## Directory Structure
```
├── client                    # Client-side code.
├── common                    # Shared code between client and server.
│   ├── assets                # All fonts, images, stylsheets.
│   │   ├── fonts
│   │   ├── images
│   │   └── stylesheets       # Follows the 7-1 pattern: http://sass-guidelin.es/#the-7-1-pattern
│   │       ├── base
│   │       ├── components
│   │       ├── layout
│   │       ├── pages
│   │       ├── shame
│   │       ├── utils
│   │       └── vendors
│   ├── components            # "Dumb" components directory
│   ├── config                # Contains the redux store configuration. Add anything else you like.
│   ├── containers            # "Smart" containers directory
│   ├── layouts               # Layout files
│   ├── middleware            # Custom redux middleware can be placed here.
│   ├── reducers              # Redux reducers
|   |   └── index.js          # Root reducer. Imports all other reducers.
│   ├── routes                # Routes each have an index.js which exports a react-router Route.
│   │   ├── example.js        # Individual routing file
│   │   └── index.js          # Root route
│   └── selectors             # Memoized selectors. See https://github.com/rackt/reselect
├── server                    # Server-side code.
└── webpack                   # Webpack configuration files.
```

## Writing Tests
The default testing framework is Mocha, though you can use whatever you want.
Make sure you have it installed:

```
npm install -g mocha
```

Tests should reside alongside the component/module/selector/etc that it is
testing. For example:

```
├── reducers
│   ├── todos.js
│   ├── todos.test.js
```

Tests can be written with ES2015, since it passes through `babel-register`.

## Running Tests
To run a single test:
```
npm test /path/to/single.test.js
```

To run a directory of tests:

```
npm test /path/to/test/directory
```

To run all tests:

```
npm run test:all
```

This will run all files that are suffixed with a `.test.js`.

## Deploying to Heroku

Just set an environment variable to point the asset host to whereever you want,
since it defaults to `localhost:3001`. If using Heroku to store assets, just use
a local route. Otherwise, set it to the CDN of your choice.
```
heroku config:set ASSET_HOST=/dist/
# OR
heroku config:set ASSET_HOST=https://s3.amazonaws.com/mybucket/myasssets/
```
