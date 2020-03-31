export class Rsvp {
    eventId: string;
    attending: boolean;
    numberOfPeople: number;

    id?: string;

    constructor(eventId: string, attending = false, numberOfPeople = 1) {
        this.eventId = eventId;
        this.attending = attending;
        this.numberOfPeople = numberOfPeople;
    }
}
