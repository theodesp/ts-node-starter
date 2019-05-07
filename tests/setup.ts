import db from '../src/core/db';

beforeAll(async () => {
    await db.users.create();
});

afterEach(async () => {
    await db.users.empty();
});

afterAll(async () => {
    await db.users.drop()
});
