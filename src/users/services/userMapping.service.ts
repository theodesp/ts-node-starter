import {User} from '../models';

export class UserMappingService {
    public mapUser = (user: any | null): User | null => {
        if (user) {
            return new User(user.id, user.email, user.firstname, user.lastname);
        }
        return user;
    };

    public mapAllUsers = (users: any[]): User[] => {
        const result: User[] = users.map((u => {
            return this.mapUser(u) as User
        }));
        return result;
    }
}

export default new UserMappingService();

