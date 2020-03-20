import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { firestore } from 'firebase/app';
import { Address } from 'src/app/auth/address';
import { Event } from 'src/app/auth/event/event';

import Timestamp = firestore.Timestamp;

@Component({
  selector: 'app-manage-event',
  templateUrl: './manage-event.component.html',
  styleUrls: ['./manage-event.component.scss']
})
export class ManageEventComponent implements OnInit {
  eventId: string;

  title: string = null;
  address: Address = null;
  signupOpenTill: Date = null;
  pricePerPerson: number = null;
  when: Date = null;
  summary: string = null;
  imageUrl: string = null;

  loaded = false;
  updating = false;

  constructor(private route: ActivatedRoute, private db: AngularFirestore) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.eventId = params.get('id');
      this.db.doc<Event>(`events/${this.eventId}`).valueChanges().subscribe(evt => {
        this.title = evt.title ? evt.title : null;
        this.address = evt.address ? evt.address as Address : null;
        this.when = evt.when ? evt.when.toDate() : null;
        this.signupOpenTill = evt.signupOpenTill ? evt.signupOpenTill.toDate() : this.when;
        this.pricePerPerson = evt.pricePerPerson ? evt.pricePerPerson : null;
        this.summary = evt.summary ? evt.summary : null;
        this.imageUrl = evt.imageUrl ? evt.imageUrl : null;
        this.loaded = true;
      });
    });
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

  updateEvent(): void {
    this.updating = true;
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
    console.log(eventObj);
    this.db.doc(`events/${this.eventId}`).set(eventObj).then(() => {
      console.log(eventObj);
    }).catch((err) => {
      console.log(err);
      return false;
    }).finally(() => {
      this.updating = false;
    });
  }

}
