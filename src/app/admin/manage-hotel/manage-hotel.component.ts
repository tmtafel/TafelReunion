import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Address } from 'src/app/auth/address';
import { Hotel } from 'src/app/home/hotel';
import { UploadTaskSnapshot } from '@angular/fire/storage/interfaces';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-manage-hotel',
  templateUrl: './manage-hotel.component.html',
  styleUrls: ['./manage-hotel.component.scss']
})
export class ManageHotelComponent implements OnInit {
  hotel: Hotel;
  fileType: string;
  fileData: File = null;
  newImagePresent = false;

  loaded = false;
  updating = false;

  constructor(private route: ActivatedRoute, private db: AngularFirestore, private storage: AngularFireStorage) {

  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      this.db.doc<Hotel>(`hotels/${id}`).valueChanges().subscribe(htl => {
        this.hotel = htl;
        this.loaded = true;
      });
    });
  }

  async updateHotel() {
    this.updating = true;
    try {
      const hotelObj = {
        address: {
          street: this.hotel.address.street,
          city: this.hotel.address.city,
          state: this.hotel.address.state,
          zip: this.hotel.address.zip,
          country: this.hotel.address.country
        },
        name: this.hotel.name,
        phone: this.hotel.phone,
        imageUrl: this.hotel.imageUrl
      };
      await this.db.doc(`hotels/${this.hotel.id}`).update(hotelObj);
      if (this.newImagePresent) {
        this.uploadImage();
      }
    } catch (err) {
      alert('error');
      console.log(err);
    }
    this.updating = false;
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
          if (nameArray && nameArray.length > 1) {
            this.hotel.imageUrl = reader.result.toString();
            this.fileType = nameArray.pop();
            this.newImagePresent = true;
            return;
          }
        }
        alert('error uploading image');
      };
    }
  }

  async uploadImage() {
    try {
      const path = `hotels/${this.hotel.id}/${this.hotel.name}.${this.fileType}`;
      const snapshot: UploadTaskSnapshot = await this.storage.upload(path, this.fileData);
      const generatedUrl = await snapshot.ref.getDownloadURL();
      this.hotel.imageUrl = generatedUrl;
    } catch (err) {
      alert('error occured, check console for log');
      console.error(err);
    }
  }
}
