export class Rsvp {
    eventId: string;
    attending: boolean;
    numberOfPeople: number;
    payed: boolean;

    id?: string;

    constructor(eventId: string, attending = false, numberOfPeople = 1, payed = false) {
        this.eventId = eventId;
        this.attending = attending;
        this.numberOfPeople = numberOfPeople;
        this.payed = payed;
    }
}
