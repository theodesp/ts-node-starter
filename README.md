# ts-node-starter

[![Greenkeeper badge](https://badges.greenkeeper.io/theodesp/ts-node-starter.svg)](https://greenkeeper.io/)

An opinionated boilerplate project built with Node.js and Typescript.

## Scripts

The following npm scripts can be run using `npm run <script>`. This project relies on `opn` and `rimraf` utilities in order to support cross-platform opening and deleting files.

- `build` - build the TypeScript files and output to `lib/`
- `build:watch` - automatically rebuild files if changes are detected in `src/`
- `clean `- recursively delete the `lib/` and `coverage/` directories
- `clean:build `- recursively delete the `lib/` directory
- `clean:coverage` - recursively delete the `coverage/` directory
- `coverage `- run the test suite and generate code coverage reports
- `coverage:open` - run npm run coverage then open the results in a browser
- `dev `- concurrently run `build:watch` and `start:watch` 
- `lint `- run the linter configured by TSLint on the `src/` directory
- `start` - run the app from `lib/`. Make sure to use npm run build first!
- `start:watch` - relaunch the server if new changes are detected in `lib/` 
- `test `- run unit tests defined in the `tests/` directory
- `test:ci `- run unit tests and generate necessary files for CI integration
