export class User {
    public id: string;
    public email: string;
    public firstName?: string;
    public lastName?: string;

    constructor(id: string, email: string, firstName: string, lastName: string = '') {
        this.id = id;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
    }
}

export enum USER_PUBLIC_FIELDS {
    id = 'id',
    email = 'email',
    firstName = 'firstname',
    lastName = 'lastname',
}
