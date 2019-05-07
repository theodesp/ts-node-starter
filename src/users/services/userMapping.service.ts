import {User} from '../models';

export class UserMappingService {
    public static mapUser(user: any | null): User | null {
        if (user) {
            return new User(user.id, user.email, user.firstname, user.lastname);
        }
        return user;
    }

    public static mapAllUsers(users: any[]): User[] {
        const result: User[] = users.map((u => {
            return UserMappingService.mapUser(u) as User
        }));
        return result;
    }
}
