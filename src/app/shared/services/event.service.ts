import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentChangeAction } from '@angular/fire/firestore';
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
        evt.id = e.payload.doc.id;
        return evt;
      });
    }));
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
  // getEvents(): Event[] {
  //   try {
  //     const events = JSON.parse(localStorage.getItem('events')) as Event[];
  //     return events;
  //   } catch (error) {
  //     console.log(error);
  //     return null;
  //   }
  // }

  // getEvent(eventId: string): Event {
  //   try {
  //     const events = JSON.parse(localStorage.getItem('events')) as Event[];
  //     const filteredEvents = events.filter(e => e.id === eventId);
  //     return filteredEvents.length > 0 ? filteredEvents[0] : null;
  //   } catch (error) {
  //     console.log(error);
  //     return null;
  //   }
  // }

  // getEventDate(eventId: string): Date {
  //   const evt = this.getEvent(eventId);
  //   return new Date(evt.when.seconds * 1000);
  // }

  // private eventsChangeListener(evts: DocumentChangeAction<Event>[]) {
  //   if (evts !== null) {
  //     const events = evts.map(evt => {
  //       const event = evt.payload.doc.data();
  //       event.id = evt.payload.doc.id;
  //       return event;
  //     });
  //     const json = JSON.stringify(events);
  //     localStorage.setItem('events', json);
  //   } else {
  //     localStorage.setItem('events', null);
  //   }
  // }
}
