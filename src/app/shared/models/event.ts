import { Address } from './address';

export class Event {

    address: Address;
    id: string;
    imageUrl: string;
    live: boolean;
    pricePerPerson: number;
    signupExpires: boolean;
    signupOpenTill: any;
    summary: string;
    title: string;
    when: any;

    constructor() {

    }

    signupOpen(): boolean {
        return Date.now() > this.signupOpenTill.toMillis();
    }
}
