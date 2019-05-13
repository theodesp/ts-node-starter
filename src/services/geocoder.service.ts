import {getService, juggler} from '@loopback/service-proxy';
import {inject, Provider} from '@loopback/core';
import {GeocoderDataSource} from '../datasources';

export interface GeoPoint {
    /**
     * latitude
     */
    y: number;

    /**
     * longitude
     */
    x: number;
}

export interface GeocoderService {
    geocode(address: string): Promise<GeoPoint[]>;
}

export class GeocoderServiceProvider implements Provider<GeocoderService> {
    constructor(
        @inject('datasources.geocoder')
        protected dataSource: juggler.DataSource = new GeocoderDataSource(),
    ) {}

    value(): Promise<GeocoderService> {
        return getService(this.dataSource);
    }
}
