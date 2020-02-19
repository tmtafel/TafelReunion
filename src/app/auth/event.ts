import { Address } from './address';

export class EventDetail {
    title: string;
    when: string;
    address: Address;
    about: string;

    getDate(): Date {
        return new Date(this.when);
    }
}
