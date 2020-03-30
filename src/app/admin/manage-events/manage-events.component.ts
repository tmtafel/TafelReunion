import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Event } from 'src/app/shared/models/event';

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
    const addNewEvent = this.dialog.open(AddNewEvent, {
      width: '300px'
    });

    addNewEvent.afterClosed().subscribe(ttl => {
      if (ttl) {
        const eventObj = {
          address: {
            street: '',
            city: '',
            state: '',
            zip: '',
            country: ''
          },
          imageUrl: '',
          live: false,
          pricePerPerson: 0,
          signupOpenTill: new Date(2020, 7, 6, 12, 0, 0),
          signupExpires: false,
          summary: '',
          title: ttl,
          when: new Date(2020, 7, 6, 12, 0, 0)
        };
        this.db.collection(`events`).add(eventObj).then(newEvent => {
          this.router.navigateByUrl(`/admin/events/${newEvent.id}`);
        }).catch(err => {
          console.log(err);
          alert('Error Adding Event, check logs for details');
        });
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
  title = '';
  constructor(public addNewEvent: MatDialogRef<AddNewEvent>) { }

  onNoClick(): void {
    this.addNewEvent.close();
  }

  onYesClick() {
    this.addNewEvent.close(this.title);
  }

}
