import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { ActivatedRoute, Router } from '@angular/router';
import { firestore } from 'firebase/compat-admin';
import { Address } from 'src/app/shared/models/address';
import { Event } from 'src/app/shared/models/event';

import Timestamp = firestore.Timestamp;
@Component({
  selector: 'app-manage-event',
  templateUrl: './manage-event.component.html',
  styleUrls: ['./manage-event.component.scss']
})
export class ManageEventComponent implements OnInit {
  originalEvent: Event;

  address: Address = null;
  eventId: string;
  imageUrl: string = null;
  live = false;
  pricePerPerson: number = null;
  signupExpires: boolean = null;
  signupOpenTill: Date = null;
  summary: string = null;
  title: string = null;
  when: Date = null;

  loaded = false;
  updating = false;
  notFound = false;

  eventHasChanged = true;

  constructor(private route: ActivatedRoute, private db: AngularFirestore, public dialog: MatDialog, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.eventId = params.get('id');
      this.db.doc<Event>(`events/${this.eventId}`).valueChanges().subscribe(evt => {
        if (evt) {
          this.address = evt.address ? evt.address as Address : null;
          this.imageUrl = evt.imageUrl ? evt.imageUrl : null;
          this.live = evt.live;
          this.pricePerPerson = evt.pricePerPerson ? evt.pricePerPerson : null;
          this.signupExpires = evt.signupExpires ? evt.signupExpires : false;
          this.signupOpenTill = evt.signupOpenTill ? evt.signupOpenTill.toDate() : this.when;
          this.summary = evt.summary ? evt.summary : null;
          this.title = evt.title ? evt.title : null;
          this.when = evt.when ? evt.when.toDate() : null;
          this.originalEvent = evt;
          this.loaded = true;
        } else {
          this.notFound = true;
        }
      });
    });
  }

  checkForChanges(): void {
    if (
      this.address.street === this.originalEvent.address.street &&
      this.address.city === this.originalEvent.address.city &&
      this.address.state === this.originalEvent.address.state &&
      this.address.zip === this.originalEvent.address.zip &&
      this.address.country === this.originalEvent.address.country &&
      this.imageUrl === this.originalEvent.imageUrl &&
      this.live === this.originalEvent.live &&
      this.pricePerPerson === this.originalEvent.pricePerPerson &&
      this.signupExpires === this.originalEvent.signupExpires &&
      Timestamp.fromDate(this.signupOpenTill).seconds === this.originalEvent.signupOpenTill.seconds &&
      this.summary === this.originalEvent.summary &&
      this.title === this.originalEvent.title &&
      Timestamp.fromDate(this.when).seconds === this.originalEvent.when.seconds
    ) {
      this.eventHasChanged = true;
    } else {
      this.eventHasChanged = false;
    }
  }

  liveChanged(toggle: MatSlideToggleChange) {
    this.live = toggle.checked;
    this.checkForChanges();
  }

  updateTitle(newTitle: string) {
    this.title = newTitle;
    this.checkForChanges();
  }

  updateAddress(newAddress: Address) {
    this.address = newAddress;
    this.checkForChanges();
  }

  updateSignupOpenTill(newDate: Date) {
    this.signupOpenTill = newDate;
    this.checkForChanges();
  }

  updateSignupExpires(newSignupExpires: boolean) {
    this.signupExpires = newSignupExpires;
    this.checkForChanges();
  }

  updatePricePerPerson(newPrice: number) {
    this.pricePerPerson = newPrice;
    this.checkForChanges();
  }

  updateWhen(newDate: Date) {
    this.when = newDate;
    this.checkForChanges();
  }

  updateSummary(newSummary: string) {
    this.summary = newSummary;
    this.checkForChanges();
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
      imageUrl: this.imageUrl,
      live: this.live,
      pricePerPerson: this.pricePerPerson,
      signupExpires: this.signupExpires,
      signupOpenTill: this.signupOpenTill,
      summary: this.summary,
      title: this.title,
      when: this.when
    };
    this.db.doc(`events/${this.eventId}`).set(eventObj).then(() => {
      console.log(eventObj);
    }).catch((err) => {
      console.log(err);
    }).finally(() => {
      this.updating = false;
    });
  }

  procedeToDelete() {
    const id = this.eventId;
    const deleteEvent = this.dialog.open(DeleteEvent, {
      width: '300px',
      data: { id }
    });

    deleteEvent.afterClosed().subscribe(deleted => {
      if (deleted) {
        this.db.doc(`events/${this.eventId}`).delete().then(() => {
          this.router.navigateByUrl('/admin/events');
        }).catch(err => {
          console.log(err);
          alert('Error Deleting event check logs for error');
        });
      }
    });
  }
}

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'delete-event',
  templateUrl: 'delete-event.html',
})

// tslint:disable-next-line:component-class-suffix
export class DeleteEvent {

  constructor(public deleteEvent: MatDialogRef<DeleteEvent>) { }

  onNoClick(): void {
    this.deleteEvent.close();
  }

  onYesClick() {
    this.deleteEvent.close(true);
  }

}
