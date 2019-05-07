import {createContext} from '@marblejs/core';
import request from 'supertest';
import httpListener from '../../../app';
import db from '../../../core/db';
import {User} from '../../../users/models';

describe('getUser$', () => {
    const app = httpListener.run(createContext());

    test('GET /users/:id returns 200 if user is found', async () => {
        const user = new User('1', 'th@th', 'Alex');
        const userId = await db.users.insert(user);

        return request(app)
            .get(`/users/${userId}`)
            .expect(200)
            .then(({body}) => {
                expect(body.id).toEqual(String(userId));
            });
    });

    test('GET /users/:id returns 404 if user is not found', async () => {
        const user = new User('1', 'th@th', 'Alex');
        await db.users.insert(user);

        return request(app)
            .get('/users/unknown')
            .expect(404, {error: {status: 404, message: 'User does not exist'}});
    });

});
