import { generateExpirationInHours } from '@marblejs/middleware-jwt';
import { User } from '../../../users/models';

export const generateTokenPayload = (user: User) => ({
    _id: user.id,
    email: user.email,
    exp: generateExpirationInHours(4),
});

export type Payload = ReturnType<typeof generateTokenPayload>;
