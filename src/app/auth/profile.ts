export class Profile {
    firstName: string;
    lastName: string;
    email: string;
    id: string;
    street?: string;
    city?: string;
    state?: string;
    zip?: string;
    country?: string;

    constructor(first: string, last: string, email: string, id: string, street?: string, city?: string, state?: string, zip?: string, country?: string) {
        this.firstName = first;
        this.lastName = last;
        this.email = email;
        this.id = id;
        this.street = street;
        this.city = city;
        this.state = state;
        this.zip = zip;
        this.country = country;
    }
}
