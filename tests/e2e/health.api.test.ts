import request from 'supertest';
import app from '../../src/app';

describe('/health', () => {
    it('returns 200 OK', () => {
        return request(app).get('/health')
            .expect(200);
    });
});
