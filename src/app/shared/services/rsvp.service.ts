import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';

import { Rsvp } from '../models/rsvp';
import { EventService } from './event.service';

@Injectable({
  providedIn: 'root'
})
export class RsvpService {
  userId: string;
  rsvps: Observable<Rsvp[]>;
  constructor(authService: AuthService, public db: AngularFirestore) {
    this.userId = authService.getCurrentUserId();
  }

  getRsvp(eventId: string): Observable<Rsvp> {
    return this.db.collection<Rsvp>(`registrations/${this.userId}/events`, events => events.where('eventId', '==', eventId)).snapshotChanges().pipe(map(rsvps => {
      if (rsvps.length > 0) {
        const rsvp = rsvps[0].payload.doc.data();
        rsvp.id = rsvps[0].payload.doc.id;
        return rsvp;
      }
      return null;
    }));
  }

  async updateRsvp(rsvp: Rsvp): Promise<boolean> {
    try {
      const rsvpObj = {
        attending: rsvp.attending,
        eventId: rsvp.eventId,
        numberOfPeople: rsvp.numberOfPeople,
        title: rsvp.title
      };
      const rsvpDoc = this.db.doc(`registrations/${this.userId}/events/${rsvp.id}`);
      await rsvpDoc.update(rsvpObj);
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  isCurrentUserAttendingEvent(rsvpId: string): Observable<boolean> {
    return this.db
      .doc<Rsvp>(`registrations/${this.userId}/events/${rsvpId}`)
      .valueChanges()
      .pipe(map(rsvp => rsvp.attending));
  }
}
