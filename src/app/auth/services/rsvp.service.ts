import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentChangeAction } from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Event } from '../event';
import { Rsvp } from '../rsvp';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RsvpService {
  userId: string;
  rsvps: Observable<Rsvp[]>;
  constructor(authService: AuthService, public db: AngularFirestore) {
    this.userId = authService.getCurrentUserId();
    if (this.userId !== null) {
      db.collection<Rsvp>(`registrations/${this.userId}/events`).snapshotChanges().subscribe(this.rsvpsChangeListener);
    }
  }

  private rsvpsChangeListener(rsvpsDoc: DocumentChangeAction<Rsvp>[]) {
    if (rsvpsDoc !== null) {
      const rsvps = rsvpsDoc.map(rsvpDoc => {
        const rsvp = rsvpDoc.payload.doc.data();
        rsvp.id = rsvpDoc.payload.doc.id;
        return rsvp;
      });
      const json = JSON.stringify(rsvps);
      localStorage.setItem('rsvps', json);
    } else {
      localStorage.setItem('rsvps', null);
    }
  }

  getRsvpsObservable(): Observable<Rsvp[]> {
    return this.db.collection<Rsvp>(`registrations/${this.userId}/events`)
      .snapshotChanges().pipe(map(rsvps => {
        return rsvps.map(r => {
          const rsvp = r.payload.doc.data();
          rsvp.id = r.payload.doc.id;
          return rsvp;
        });
      }));
  }

  getRsvps(): Rsvp[] {
    try {
      const rsvps = JSON.parse(localStorage.getItem('rsvps')) as Rsvp[];
      return rsvps;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  getRsvpObservable(eventId: string): Observable<Rsvp> {
    return this.db.collection<Rsvp>(`registrations/${this.userId}/events`, events => events.where('eventId', '==', eventId))
      .snapshotChanges().pipe(map(rsvps => {
        if (rsvps.length > 0) {
          const rsvp = rsvps[0].payload.doc.data();
          rsvp.id = rsvps[0].payload.doc.id;
          return rsvp;
        }
        return null;
      }));
  }

  getRsvp(eventId: string): Rsvp {
    try {
      const rsvps = JSON.parse(localStorage.getItem('rsvps')) as Rsvp[];
      const filteredRsvps = rsvps.filter(r => r.eventId === eventId);
      return filteredRsvps.length > 0 ? filteredRsvps[0] : null;
    } catch (error) {
      console.log(error);
      return null;
    }
  }


  addRsvp(event: Event): Promise<boolean> {
    const rsvpObj = {
      eventId: event.id,
      title: event.title,
      attending: false,
      numberOfPeople: 1
    };
    return this.db.collection<Rsvp>(`registrations/${this.userId}/events`).add(rsvpObj)
      .then(() => true)
      .catch(err => false);
  }


  updateRsvp(rsvp: Rsvp): Promise<boolean> {
    const rsvpObj = {
      attending: rsvp.attending,
      eventId: rsvp.eventId,
      numberOfPeople: rsvp.numberOfPeople,
      title: rsvp.title
    };
    const rsvpDoc = this.db.doc(`registrations/${this.userId}/events/${rsvp.id}`);
    return rsvpDoc.update(rsvpObj)
      .then(() => {
        return true;
      }).catch(err => {
        return false;
      });
  }

  isCurrentUserAttendingEvent(rsvpId: string): Observable<boolean> {
    return this.db
      .doc<Rsvp>(`registrations/${this.userId}/events/${rsvpId}`)
      .valueChanges()
      .pipe(map(rsvp => rsvp.attending));
  }
}
