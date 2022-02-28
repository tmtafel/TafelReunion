import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentChangeAction } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Event } from '../models/event';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(public db: AngularFirestore) {
    db.collection<Event>('events').snapshotChanges();
  }

  getEvents(): Observable<Event[]> {
    return this.db.collection<Event>(`events`).snapshotChanges().pipe(map(evts => {
      return evts.map(e => {
        const evt = e.payload.doc.data();
        evt.id = e.payload.doc.data().id;
        return evt;
      });
    }));
  }

  getLiveEvents(): Observable<Event[]> {
    return this.getEvents().pipe(map(evts => evts.filter(e => e.live)));
  }

  getEvent(eventId: string): Observable<Event> {
    return this.db.doc<Event>(`events/${eventId}`).snapshotChanges().pipe(map(e => {
      if (e) {
        const evt = e.payload.data();
        evt.id = eventId;
        return evt;
      }
      return null;
    }));
  }
}
