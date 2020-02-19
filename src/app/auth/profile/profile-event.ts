
export class ProfileEvent {
    eventId: string;
    title: string;
    attending: boolean;
    profileEventId: string;

    constructor(eventId: string, title: string, attending = false) {
        this.eventId = eventId;
        this.title = title;
        this.attending = attending;
    }
}
