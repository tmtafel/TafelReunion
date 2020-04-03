export class Member {
    email: string;
    firstName: string;
    lastName: string;
    age: number;
    relation: string;
    profileId: string;
    id: string;

    constructor(profileId: string) {
        this.profileId = profileId;
    }
}
