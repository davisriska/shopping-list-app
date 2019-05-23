import {User} from './user';

export class ProductList {

    public id: number;
    public name: string;

    public user: User;

    constructor(user: User) {
        this.user = user;
    }

}
