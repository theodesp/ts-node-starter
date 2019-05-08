import db from '@core/db';
import {User} from '@users/models';
import {from} from 'rxjs';

describe('Users Repository', () => {
    beforeEach(async () => {
        await db.users.create();
    });
    afterEach(async () => {
        await db.users.drop();
    });
    test('#findByCredentials finds user by credentials', async (done) => {
        // given
        const user = new User('1', 'th@th', 'Alex', '', '123');
        await db.users.insert(user);
        // when
        const result$ = from(db.users.findByCredentials(user.email, user.password!));

        // then
        result$.subscribe(result => {
            if (!result) {
                return fail('User should be found');
            }

            expect(result.firstName).toEqual(user.firstName);
            expect(result.lastName).toEqual(user.lastName);
            expect(result.email).toEqual(user.email);
            expect(result.password).toBeUndefined();
            done();
        });
    });

    test('#findOne finds user by given ID', async (done) => {
        // given
        const user = new User('1', 'th@th', 'Alex', '', '123');
        const id = await db.users.insert(user);

        // when
        const result$ = from(db.users.findOne(id));

        // then
        result$.subscribe(result => {
            if (!result) {
                return fail('User should be found');
            }

            expect(result.firstName).toEqual(user.firstName);
            expect(result.lastName).toEqual(user.lastName);
            expect(result.email).toEqual(user.email);
            expect(result.password).toBeUndefined();
            done();
        });
    });

    test('#findAll finds all users', async (done) => {
        // given
        const user1 = new User('1', 'th@th', 'Alex', '', '123');
        const user2 = new User('2', 'ht@th', 'Mike', '', '321');
        const users = [user1, user2];
        await db.users.insert(user1);
        await db.users.insert(user2);

        // when
        const result$ = from(db.users.findAll());

        // then
        result$.subscribe(result => {
            result.forEach((item, i) => {
                const reference = users[i];
                expect(item.firstName).toEqual(reference.firstName);
                expect(item.lastName).toEqual(reference.lastName);
                expect(item.email).toEqual(reference.email);
                expect(item.password).toBeUndefined();
                done();
            });
        });
    });
});
