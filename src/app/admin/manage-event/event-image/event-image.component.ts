import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { UploadTaskSnapshot } from '@angular/fire/storage/interfaces';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'event-image',
  templateUrl: './event-image.component.html',
  styleUrls: ['./event-image.component.scss']
})
export class EventImageComponent implements OnInit {

  @Input() url: string;
  @Input() eventId: string;
  @Output() imageUrlChange: EventEmitter<string> = new EventEmitter();

  name: string;
  fileType: string;
  fileData: File = null;
  previewUrl: any = null;
  storedUrl: any = null;

  constructor(private storage: AngularFireStorage) { }

  ngOnInit() {
  }

  fileUploadClick() {
    const fileUpload = document.getElementById('fileUpload') as HTMLInputElement;
    fileUpload.click();
  }

  fileProgress(fileInput: any) {
    if (fileInput.target.files && fileInput.target.files[0]) {
      this.fileData = fileInput.target.files[0] as File;
      const mimeType = this.fileData.type;
      if (mimeType.match(/image\/*/) == null) {
        this.fileData = null;
        alert('not an image');
        return;
      }
      const reader = new FileReader();
      reader.readAsDataURL(this.fileData);
      reader.onload = (evt) => {
        const name = this.fileData.name;
        if (name) {
          const nameArray = this.fileData.name.split('.');
          if (nameArray) {
            if (nameArray.length > 1) {
              this.previewUrl = reader.result;
              this.fileType = nameArray.pop();
              this.name = nameArray.join('-');
            }
          }
        }
      };
    }
  }

  async onSubmit() {
    if (!(this.eventId)) {
      console.log('no event id');
      return;
    }
    try {
      const path = `events/${this.eventId}/${this.name}.${this.fileType}`;
      const snapshot: UploadTaskSnapshot = await this.storage.upload(path, this.fileData);
      const generatedUrl = await snapshot.ref.getDownloadURL();
      this.previewUrl = generatedUrl;
      this.imageUrlChange.emit(generatedUrl);
    } catch (err) {
      alert('error occured, check console for log');
      console.error(err);
    }
  }


}
