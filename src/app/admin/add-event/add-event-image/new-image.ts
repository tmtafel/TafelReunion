export class NewImage {
    name: string;
    fileType: string;
    fileData: File;

    constructor(data: File) {
        this.fileData = data;
    }
}
