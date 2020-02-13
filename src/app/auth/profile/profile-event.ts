
export class ProfileEvent {
    id: string;
    title: string;
    attending: boolean;

    constructor(id: string, title: string, attending = false) {
        this.id = id;
        this.title = title;
        this.attending = attending;
    }
}
