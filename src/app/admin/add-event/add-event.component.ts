import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Address } from '../../auth/address';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss']
})
export class AddEventComponent implements OnInit {
  eventId: string;

  title: string = null;
  address: Address = null;
  signupOpenTill: Date = null;
  pricePerPerson: number = null;
  when: Date = null;
  summary: string = null;
  imageUrl: string = null;

  constructor(private db: AngularFirestore, private router: Router) {
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

  updateImageUrl(newUrl: string) {
    this.imageUrl = newUrl;
    this.updateEvent();
  }

  async updateEvent() {
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
        summary: this.summary,
        imageUrl: this.imageUrl
      };
      const newEvent = await this.db.collection(`events`).add(eventObj);
      this.router.navigateByUrl(`events/${newEvent.id}`);
    } catch (err) {
      console.log(err);
      alert('Error Occured creating event, check logs for details');
    }
  }

}
