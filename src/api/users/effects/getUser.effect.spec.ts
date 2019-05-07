import {createContext} from '@marblejs/core';
import {of} from 'rxjs';
import request from 'supertest';
import httpListener from '../../../app';
import db from '../../../core/db';
import {User} from '../../../users/models';

describe('getUser$', () => {
    const app = httpListener.run(createContext());

    test('GET /users/:id returns 200 if user is found', async () => {
        const user = new User('1', 'th@th', 'Alex');

        spyOn(db.users, 'findOne').and.callFake(() => of(user));

        return request(app)
            .get(`/users/${user.id}`)
            .expect(200)
            .then(({body}) => {
                expect(body.id).toEqual(String(user.id));
            });
    });

    test('GET /users/:id returns 404 if user is not found', async () => {
        spyOn(db.users, 'findOne').and.callFake(() => of(null));

        return request(app)
            .get('/users/unknown')
            .expect(404, {error: {status: 404, message: 'User does not exist'}});
    });

});
