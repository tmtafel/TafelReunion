import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';

import { Rsvp } from '../models/rsvp';

@Injectable({
  providedIn: 'root'
})
export class RsvpService {
  userId: string;
  // rsvps: Observable<Rsvp[]>;
  constructor(authService: AuthService, public db: AngularFirestore) {
    this.userId = authService.getCurrentUserId();
  }

  getRsvp(eventId: string): Observable<Rsvp> {
    return this.db.collection<Rsvp>(`registrations/${this.userId}/events`, events => events.where('eventId', '==', eventId)).snapshotChanges().pipe(map(rsvps => {
      if (rsvps.length > 0) {
        const rsvp = rsvps[0].payload.doc.data();
        rsvp.id = rsvps[0].payload.doc.data().id;
        return rsvp;
      }
      return null;
    }));
  }

  async updateRsvp(rsvp: Rsvp): Promise<Rsvp> {
    try {
      const rsvpObj = {
        attending: rsvp.attending,
        eventId: rsvp.eventId,
        numberOfPeople: rsvp.numberOfPeople,
        payed: rsvp.payed
      };
      const rsvpDoc = this.db.doc(`registrations/${this.userId}/events/${rsvp.id}`);
      await rsvpDoc.update(rsvpObj);
      return rsvp;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  isCurrentUserAttendingEvent(rsvpId: string): Observable<boolean> {
    return this.db
      .doc<Rsvp>(`registrations/${this.userId}/events/${rsvpId}`)
      .valueChanges()
      .pipe(map(rsvp => rsvp.attending));
  }
}
