import {inject} from '@loopback/core';
import {juggler} from '@loopback/repository';
import * as config from './geocoder.datasource.json';

export class GeocoderDataSource extends juggler.DataSource {
  static dataSourceName = 'geocoder';

  constructor(
    @inject('datasources.config.geocoder', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
