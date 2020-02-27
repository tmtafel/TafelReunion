import { Address } from './address';
import { firestore } from 'firebase/app';
import Timestamp = firestore.Timestamp;

export class Event {

    address: Address;
    title: string;
    id: string;
    pricePerPerson: number;
    signupOpenTill: Timestamp;
    summary: string;
    when: Timestamp;


    constructor() {

    }

    signupOpen(): boolean {
        return Date.now() > this.signupOpenTill.toMillis();
    }
}
