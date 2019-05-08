import db from '@core/db';
import {createContext} from '@marblejs/core';
import {User} from '@users/models';
import {of} from 'rxjs';
import request from 'supertest';
import httpListener from '../../../app';
import {mockAuthorizationFor} from '../../../tests/mocks/auth.mock';

describe('getUser$', () => {
    const app = httpListener.run(createContext());

    test('GET /users/:id returns 200 if user is found', async () => {
        const user = new User('1', 'th@th', 'Alex', '', '123');
        spyOn(db.users, 'findOne').and.callFake(() => of(user));
        spyOn(db.users, 'findByCredentials').and.callFake(() => of(user));

        const token = await mockAuthorizationFor(user)(app);

        return request(app)
            .get(`/users/${user.id}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
            .then(({body}) => {
                expect(body.id).toEqual(String(user.id));
                expect(body.email).toEqual(user.email);
                expect(body.firstName).toEqual(user.firstName);
                expect(body.lastName).toEqual(user.lastName);
            });
    });

    test('GET /users/:id returns 401 if not authorized', async () =>
        request(app)
            .get('/users/123')
            .expect(401, {error: {status: 401, message: 'Unauthorized'}})
    );

    test('GET /users/:id returns 404 if user is not found', async () => {
        const user = new User('1', 'th@th', 'Alex', '', '123');
        spyOn(db.users, 'findOne').and.returnValues([of(user), of(null)]);
        spyOn(db.users, 'findByCredentials').and.callFake(() => of(user));

        const token = await mockAuthorizationFor(user)(app);

        return request(app)
            .get('/users/unknown')
            .set('Authorization', `Bearer ${token}`)
            .expect(404, {error: {status: 404, message: 'User does not exist'}});
    });

});
