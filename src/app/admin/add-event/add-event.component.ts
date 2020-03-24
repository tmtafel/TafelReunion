import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Address } from '../../auth/address';
import { NewImage } from './add-event-image/new-image';
import { AngularFireStorage } from '@angular/fire/storage';
import { UploadTaskSnapshot } from '@angular/fire/storage/interfaces';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss']
})
export class AddEventComponent implements OnInit {
  title: string = null;
  address: Address = null;
  signupOpenTill: Date = null;
  pricePerPerson: number = null;
  when: Date = null;
  summary: string = null;
  image: NewImage = null;

  constructor(private db: AngularFirestore, private router: Router, private storage: AngularFireStorage) {
  }

  ngOnInit() {
  }

  updateTitle(newTitle: string) {
    this.title = newTitle;
  }

  updateAddress(newAddress: Address) {
    this.address = newAddress;
  }

  updateSignupOpenTill(newDate: Date) {
    this.signupOpenTill = newDate;
  }

  updatePricePerPerson(newPrice: number) {
    this.pricePerPerson = newPrice;
  }

  updateWhen(newDate: Date) {
    this.when = newDate;
  }

  updateSummary(newSummary: string) {
    this.summary = newSummary;
  }

  addImage(newImage: NewImage) {
    this.image = newImage;
  }

  async addEvent() {
    try {
      const eventObj = {
        address: {
          street: this.address.street,
          city: this.address.city,
          state: this.address.state,
          zip: this.address.zip,
          country: this.address.country
        },
        title: this.title,
        pricePerPerson: this.pricePerPerson,
        signupOpenTill: this.signupOpenTill,
        when: this.when,
        summary: this.summary
      };
      const newEvent = await this.db.collection(`events`).add(eventObj);
      if (this.image) {
        const path = `events/${newEvent.id}/${this.image.name}.${this.image.fileType}`;
        const snapshot: UploadTaskSnapshot = await this.storage.upload(path, this.image.fileData);
        const generatedUrl = await snapshot.ref.getDownloadURL();
        const eventObjWithImage = {
          address: {
            street: this.address.street,
            city: this.address.city,
            state: this.address.state,
            zip: this.address.zip,
            country: this.address.country
          },
          title: this.title,
          pricePerPerson: this.pricePerPerson,
          signupOpenTill: this.signupOpenTill,
          when: this.when,
          summary: this.summary,
          imageUrl: generatedUrl
        };
        await this.db.doc(`events/${newEvent.id}`).set(eventObjWithImage);
      }
      this.router.navigateByUrl(`events/${newEvent.id}`);
    } catch (err) {
      console.log(err);
      alert('Error Occured creating event, check logs for details');
    }
  }
}
