import {TsNodeStarterApplication} from './application';
import {ApplicationConfig} from '@loopback/core';

export {TsNodeStarterApplication};

export async function main(options: ApplicationConfig = {}) {
  const app = new TsNodeStarterApplication(options);
  await app.boot();
  await app.start();

  const url = app.restServer.url;
  console.log(`Server is running at ${url}`);
  console.log(`Try ${url}/ping`);

  return app;
}
