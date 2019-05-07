# ts-node-starter

[![Greenkeeper badge](https://badges.greenkeeper.io/theodesp/ts-node-starter.svg)](https://greenkeeper.io/)
[![Build Status](https://travis-ci.org/theodesp/ts-node-starter.svg?branch=master)](https://travis-ci.org/theodesp/ts-node-starter)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

An opinionated boilerplate project built with Node.js and Typescript.

### Stack

- Runtime: [Node.js](https://nodejs.org/en/)
- Type System: [TypeScript](https://www.typescriptlang.org/)
- Test Runner: [Jest](https://jestjs.io/)
- Linter: [TSlint](https://palantir.github.io/tslint/)
- Assertions: [Chai](https://www.chaijs.com/)
- Framework: [Marble.js](https://docs.marblejs.com/)

## Scripts

The following npm scripts can be run using `npm run <script>`. This project relies on `cross-env` and `rimraf` utilities in order to support cross-platform opening and deleting files.

- `build` - build the TypeScript files and output to `lib/`
- `clean `- recursively delete the `lib/` and `coverage/` directories
- `clean:build `- recursively delete the `lib/` directory
- `clean:coverage` - recursively delete the `coverage/` directory
- `coverage `- run the test suite and generate code coverage reports
- `coverage:open` - run npm run coverage then open the results in a browser
- `dev `- concurrently run `build:watch` and `start:watch` 
- `lint `- run the linter configured by TSLint on the `src/` directory
- `start` - run server
- `start:dev` - run server from `src`
- `start:watch` - relaunch the server if new changes are detected in `src/` 
- `test `- run unit tests defined in the `tests/` directory
- `test:watch `- run tests in watch mode
- `test:ci `- run unit tests and generate necessary files for CI integration
