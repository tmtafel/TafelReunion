import { Address } from './address';

export class Event {
    title: string;
    when: string;
    address: Address;

    getDate(): Date {
        return new Date(this.when);
    }
}
