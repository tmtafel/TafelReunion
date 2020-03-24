import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { UploadTaskSnapshot } from '@angular/fire/storage/interfaces';
import { NewImage } from './new-image';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'add-event-image',
  templateUrl: './add-event-image.component.html',
  styleUrls: ['./add-event-image.component.scss']
})
export class AddEventImageComponent implements OnInit {
  @Output() imageChange: EventEmitter<NewImage> = new EventEmitter();
  previewUrl: any = null;

  constructor() { }

  ngOnInit() {
  }

  fileUploadClick() {
    const fileUpload = document.getElementById('fileUpload') as HTMLInputElement;
    fileUpload.click();
  }

  fileProgress(fileInput: any) {
    if (fileInput.target.files && fileInput.target.files[0]) {
      const data = fileInput.target.files[0] as File;
      const newImage = new NewImage(data);
      const mimeType = newImage.fileData.type;
      if (mimeType.match(/image\/*/) == null) {
        newImage.fileData = null;
        alert('not an image');
        return;
      }
      const reader = new FileReader();
      reader.readAsDataURL(newImage.fileData);
      reader.onload = (evt) => {
        const name = newImage.fileData.name;
        if (name) {
          const nameArray = newImage.fileData.name.split('.');
          if (nameArray) {
            if (nameArray.length > 1) {
              this.previewUrl = reader.result;
              newImage.fileType = nameArray.pop();
              newImage.name = nameArray.join('-');
              this.imageChange.emit(newImage);
            }
          }
        }
      };
    }
  }
}
