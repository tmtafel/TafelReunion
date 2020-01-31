export class Registration {
    firstName: string;
    lastName: string;
    email: string;

    constructor(first: string, last: string, email: string) {
        this.firstName = first;
        this.lastName = last;
        this.email = email;
    }

    getDocumentObject(): any {
        return {
            first: this.firstName,
            last: this.lastName,
            email: this.email,
        };
    }
}
