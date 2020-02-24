
export interface IRsvp {
    eventId: string;
    title: string;
    attending: boolean;
}

export class Rsvp implements IRsvp {
    eventId: string;
    title: string;
    attending: boolean;
    id: string;

    constructor(eventId: string, title: string, attending = false) {
        this.eventId = eventId;
        this.title = title;
        this.attending = attending;
    }
}
