import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { Address } from 'src/app/auth/address';
import { Event } from 'src/app/auth/event/event';

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

  procedeToDelete() {
    const id = this.eventId;
    const deleteEvent = this.dialog.open(DeleteEvent, {
      width: '300px',
      data: { id }
    });

    deleteEvent.afterClosed().subscribe(deleted => {
      if (deleted) {
        this.router.navigateByUrl('/admin/events');
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

  constructor(public dialogAttending: MatDialogRef<DeleteEvent>, @Inject(MAT_DIALOG_DATA) public data: any, private http: HttpClient) { }

  onNoClick(): void {
    this.dialogAttending.close(false);
  }

  onYesClick() {
    try {
      this.http.get(`https://us-central1-tafelreunion.cloudfunctions.net/deleteEvent?id=${this.data.id}`, { responseType: 'text' })
        .pipe(
          tap(deleted => {
            if (deleted) {
              this.dialogAttending.close(true);
            }
            this.dialogAttending.close(false);
          }));
    } catch (err) {
      console.log(err);
      alert('Error Deleting Event, check logs for details');
      this.dialogAttending.close(false);
    }
  }

}
