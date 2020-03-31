import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { ActivatedRoute, Router } from '@angular/router';
import { Address } from 'src/app/shared/models/address';
import { Event } from 'src/app/shared/models/event';

@Component({
  selector: 'app-manage-event',
  templateUrl: './manage-event.component.html',
  styleUrls: ['./manage-event.component.scss']
})
export class ManageEventComponent implements OnInit {

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

  constructor(
    private route: ActivatedRoute,
    private db: AngularFirestore,
    public dialog: MatDialog,
    private router: Router
  ) { }

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
          this.loaded = true;
        } else {
          this.notFound = true;
        }
      });
    });
  }

  liveChanged(toggle: MatSlideToggleChange) {
    this.live = toggle.checked;
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

  updateSignupExpires(newSignupExpires: boolean) {
    this.signupExpires = newSignupExpires;
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
