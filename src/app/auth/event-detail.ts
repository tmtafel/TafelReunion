import { Address } from './address';
import { firestore } from 'firebase/app';
import Timestamp = firestore.Timestamp;

export class EventDetail {
    title: string;
    when: Timestamp;
    address: Address;
    about: string;
    eventId: string;
    pricePerPerson: number;
    signupOpenTill: Timestamp;

    
}
