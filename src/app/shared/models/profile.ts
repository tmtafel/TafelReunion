import { Address } from './address';
import { Roles } from './roles';

export class Profile {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    address: Address;
    phone: string;
    branch: string;
    roles: Roles;

    constructor(id: string, email: string) {
        this.id = id;
        this.email = email;
        this.firstName = '';
        this.lastName = '';
        this.address = new Address();
        this.address.street = '';
        this.address.city = '';
        this.address.state = '';
        this.address.zip = '';
        this.address.country = '';
        this.phone = '';
        this.branch = '';
        this.roles.admin = false;
        this.roles.leader = false;
        this.roles.member = false;
    }
}


