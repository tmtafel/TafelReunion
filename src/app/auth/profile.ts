import { Address } from './address';

export class Profile {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    address: Address;
    phone: string;

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
    }
}


