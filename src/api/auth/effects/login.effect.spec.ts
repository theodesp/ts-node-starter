import db from '@core/db';
import {User} from '@users/models';
import {of} from 'rxjs';
import request from 'supertest';
import {index} from '../../../index';

const USER_MOCK = new User('1', 'th@th', 'Alex');

describe('Login effect', () => {
    let jwtMiddleware: any;

    beforeEach(() => {
        jest.unmock('@marblejs/middleware-jwt');
        jwtMiddleware = require('@marblejs/middleware-jwt');
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('POST /auth/login returns 400 status if "login" is not provided', async () =>
        request(index.server)
            .post('/auth/login')
            .expect(400)
            .expect(res => {
                expect(res.body).toMatchObject({
                    'error': {
                        'context': 'body',
                        'data': [{'expected': '{ login: string, password: string }', 'path': ''}],
                        'message': 'Validation error',
                        'status': 400
                    }
                });
            })
    );

    test('POST /auth/login returns 400 status if "password" is not provided', async () =>
        request(index.server)
            .post('/auth/login')
            .send({login: 'test'})
            .expect(400)
            .expect(res => {
                expect(res.body).toMatchObject({
                    'error': {
                        'context': 'body',
                        'data': [{'expected': 'string', 'path': 'password'}],
                        'message': 'Validation error',
                        'status': 400
                    }
                });
            })
    );

    test('POST /auth/login returns 403 if credentials are incorrect', async () => {
        spyOn(db.users, 'findByCredentials').and.callFake(() => of(null));

        return request(index.server)
            .post('/auth/login')
            .send({login: 'test', password: 'test'})
            .expect(401)
            .expect(res => {
                expect(res.body).toMatchObject(
                    {
                        'error': {'message': 'Unauthorized', 'status': 401}
                    });
            })
    });

    test('POST /auth/login responds with JWT token', async () => {
        const expectedToken = 'TEST_TOKEN';

        spyOn(db.users, 'findByCredentials').and.callFake(() => of(USER_MOCK));
        jwtMiddleware.generateToken = jest.fn(() => () => expectedToken);

        return request(index.server)
            .post('/auth/login')
            .send({login: 'admin', password: 'admin'})
            .expect(200, {token: expectedToken})
    });
});
