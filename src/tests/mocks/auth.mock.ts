import { User } from '@users/models';
import request from 'supertest';

export const mockAuthorizationFor = (user: User) => async (app: any) => {
    const { token } = await request(app)
        .post('/auth/login')
        .send({ login: user.email, password: user.password })
        .then(response => response.body as { token: string });
    return token;
};
