import { Address } from './address';

export class Registration {
    firstName: string;
    lastName: string;
    email: string;
    id: string;
    address: Address;

    constructor(first: string, last: string, email: string, id: string) {
        this.firstName = first;
        this.lastName = last;
        this.email = email;
        this.id = id;
    }

    getDocumentObject() {
        return JSON.stringify(this);
    }
}
