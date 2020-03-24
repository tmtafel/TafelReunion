import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Event } from 'src/app/auth/event/event';

@Component({
  selector: 'app-manage-events',
  templateUrl: './manage-events.component.html',
  styleUrls: ['./manage-events.component.scss']
})
export class ManageEventsComponent implements OnInit {

  events$: Observable<Event[]>;
  constructor(private db: AngularFirestore, public dialog: MatDialog, private router: Router) { }

  ngOnInit() {
    this.events$ = this.db.collection<Event>('events').snapshotChanges().pipe(map(events => {
      return events.map(evt => {
        const event = evt.payload.doc.data();
        event.id = evt.payload.doc.id;
        return event;
      });
    }));
  }

  procedeToAdd() {
    const addEvent = this.dialog.open(AddNewEvent, {
      width: '300px'
    });

    addEvent.afterClosed().subscribe(id => {
      if (id) {
        this.router.navigateByUrl(`/admin/events/${id}`);
      }
    });
  }
}

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'add-new-event',
  templateUrl: 'add-new-event.html',
})

// tslint:disable-next-line:component-class-suffix
export class AddNewEvent {

  constructor(public dialogAttending: MatDialogRef<AddNewEvent>, private db: AngularFirestore) { }
  title = '';

  onNoClick(): void {
    this.dialogAttending.close();
  }

  async onYesClick() {
    try {
      const eventObj = {
        address: {
          street: '',
          city: '',
          state: '',
          zip: '',
          country: ''
        },
        title: this.title,
        pricePerPerson: 0,
        signupOpenTill: new Date(2020, 7, 6, 12, 0, 0),
        when: new Date(2020, 7, 6, 12, 0, 0),
        summary: '',
        imageUrl: ''
      };
      const newEvent = await this.db.collection(`events`).add(eventObj);
      this.dialogAttending.close(newEvent.id);
    } catch (err) {
      console.log(err);
      alert('Error Adding Event, check logs for details');
      this.dialogAttending.close();
    }
  }

}
