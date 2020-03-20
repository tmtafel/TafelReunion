import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
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
  constructor(private db: AngularFirestore) { }

  ngOnInit() {
    this.events$ = this.db.collection<Event>('events').snapshotChanges().pipe(map(events => {
      return events.map(evt => {
        const event = evt.payload.doc.data();
        event.id = evt.payload.doc.id;
        return event;
      });
    }));
  }
}
