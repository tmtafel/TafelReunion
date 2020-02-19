export class AddEvent {
    eventId: string;
    title: string;
    attending: boolean;

    constructor(eventId: string, title: string, attending = false) {
        this.eventId = eventId;
        this.title = title;
        this.attending = attending;
    }
}
