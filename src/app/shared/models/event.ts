import { firestore } from 'firebase-admin';

import Timestamp = firestore.Timestamp;
import { Address } from './address';

export class Event {

    address: Address;
    id: string;
    imageUrl: string;
    live: boolean;
    pricePerPerson: number;
    signupExpires: boolean;
    signupOpenTill: Timestamp;
    summary: string;
    title: string;
    when: Timestamp;

    constructor() {

    }

    signupOpen(): boolean {
        return Date.now() > this.signupOpenTill.toMillis();
    }
}
