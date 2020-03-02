
export interface IRsvp {
    eventId: string;
    title: string;
    attending: boolean;
}

export class Rsvp implements IRsvp {
    eventId: string;
    title: string;
    attending: boolean;
    numberOfPeople: number;

    id?: string;

    constructor(eventId: string, title: string, attending = false, numberOfPeople = 1) {
        this.eventId = eventId;
        this.title = title;
        this.attending = attending;
        this.numberOfPeople = numberOfPeople;
    }
}
