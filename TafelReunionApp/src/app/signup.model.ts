export class Signup {
    name: string;
    creationDate: Date;
    id?: string;

    constructor(name: string, creationDate?: Date) {
        this.name = name;
        if (creationDate) {
            this.creationDate = creationDate;
        } else{
            this.creationDate = new Date(Date.now());
        }
    }

    getDocumentObject(): any {
        return {
            name: this.name,
            creationDate: this.creationDate,
            id: this.id
        };
    }
}
