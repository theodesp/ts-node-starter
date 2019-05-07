import request from 'supertest';
import {index} from '../../src';

xdescribe('/health', () => {
    it('returns 200 OK', () => {
        return request(index.server).get('/health')
            .expect(200);
    });
});
