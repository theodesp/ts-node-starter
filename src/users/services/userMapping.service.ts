import {User} from '../models';

export class UserMappingService {
    public mapUser(u: any | null): User | null {
        if (u) {
            return new User(u.id, u.email, u.firstname, u.lastname)
        }
        return u
    }
}

export default new UserMappingService()
