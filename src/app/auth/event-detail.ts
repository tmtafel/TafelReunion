import { Address } from './address';
import { firestore } from 'firebase/app';
import Timestamp = firestore.Timestamp;

export class EventDetail {

    address: Address;
    title: string;
    eventId: string;
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
