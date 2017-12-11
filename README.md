# universal-react-redux

A universal starter kit built with ES2015, react, react-router and redux. Server
rendering with react and express. Bundled with Webpack, with HMR transforms and
support for `css-modules`.

**NOTE: This repository is meant to be continually updated to use the latest in
the react ecosystem. It is meant to be more of a guiding template for you to
customize and build your own universal apps with React and Redux. I do not
promise that future updates will not break your existing application.**

## Get started

Copy environment variables and edit them if necessary:
```
cp .env.example .env
```

Then:
```
npm install
npm start
```

Direct your browser to `http://localhost:3000`.

For production builds:

```
npm run prod:build
npm run serve
```
Or simply

```
npm run prod
```

For Heroku, simply add a `Procfile`:
```
web: npm run serve
```

## Directory Structure
```
├── client                         # Client-side code
├── common                         # Shared code between client and server
│   ├── css                        # CSS/Sass Resources
│   ├── fonts
│   ├── images
│   ├── js
│   │   ├── actions
│   │   ├── components            # "Dumb" components
│   │   ├── containers            # Smart containers
│   │   ├── lib                   # Misc. libraries like helpers, etc.
│   │   ├── middleware            # Middleware for redux
│   │   ├── reducers              # Redux reducers
│   │   ├── routes                # Routes each have an index.js which exports a react-router Route.
│   │   └── store                 # Store configuration for production and dev.
│   └── layouts                   # Layout files to be rendered by the server.
├── server                        # Server-side code
├── webpack                       # Webpack configuration files
```

## CSS Modules
This project uses [CSS Modules](https://github.com/css-modules/css-modules).
Class names should be in `camelCase`. Place the css file as a sibling to the
component with the same name, for example:
```
├── components
│   ├── Header.js
│   ├── Header.scss
```

## Redux Devtools
This project supports the awesome [Redux Devtools Extension](https://github.com/zalmoxisus/redux-devtools-extension). Install the
Chrome or Firefox extension and it should just work.

## Server Side Rendering (SSR) and Asynchronous Data Fetching
When rendering components on the server, you'll find that you may need to fetch
some data before it can be rendered. The [server code](server/server.js) looks
for a `fetchData` method on the container component and its child components,
then executes all of them and only renders after the promises have all been
resolved.

See the [TodosContainer](common/js/containers/Todos/index.js) for an example.

## Async / Await
This project uses `async/await`, available by default in Node.js v8.x.x or
higher. If you experience errors, please upgrade your version of Node.js.

## Writing Tests
The default testing framework is Mocha, though you can use whatever you want.
Make sure you have it installed:

```
npm install -g mocha
```

Tests should reside in `test/spec` in their appropriate folders:

```
├── test
│   ├── spec
│   │   ├── api
│   │   │   ├── todos.test.js
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

## Running ESLint

```
npm run lint
```

Check the `.eslintignore` file for directories excluded from linting.

## Changing the Asset Host

In production scenarios, you may want your assets to be hosted elsewhere besides
on your server. Just set an environment variable to point the asset host to
where ever you want, as defaults to `localhost:3001`. Just set it to the CDN of
your choice.

If you're using Heroku:
```
heroku config:set ASSET_HOST=/dist/
# OR
heroku config:set ASSET_HOST=https://s3.amazonaws.com/mybucket/myasssets/
```
