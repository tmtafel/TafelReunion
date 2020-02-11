export class HomeEvent {
    html: string;
    text: string;
    tag: string;
    cssClass: string;
    src = '';

    constructor(text: string, tag: string, cssClass: string, src?: string) {
        if (src) {
            this.src = src;
        }
        this.text = text;
        this.tag = tag;
        this.cssClass = cssClass;
        this.buildIcon();
    }

    buildIcon(): void {
        const icon = this.tag === 'img' ?
            `<img class="${this.cssClass}" src="${this.src}" width="24px" height="24px">` :
            `<${this.tag} class="${this.cssClass}">${this.src}</${this.tag}>`;
        this.html = icon + '<span>' + this.text + '</span>' + icon;
    }
}
