import { firestore } from 'firebase/app';

import Timestamp = firestore.Timestamp;
import { Address } from '../address';

export class Event {

    address: Address;
    title: string;
    id: string;
    pricePerPerson: number;
    signupOpenTill: Timestamp;
    summary: string;
    when: Timestamp;
    imageUrl: string;


    constructor() {

    }

    signupOpen(): boolean {
        return Date.now() > this.signupOpenTill.toMillis();
    }
}
