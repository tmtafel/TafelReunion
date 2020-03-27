import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Rsvp } from '../models/rsvp';
import { AuthService } from 'src/app/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RsvpService {
  userId: string;
  rsvps: Observable<Rsvp[]>;
  constructor(authService: AuthService, public db: AngularFirestore) {
    this.userId = authService.getCurrentUserId();
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

  updateRsvp(rsvp: Rsvp): Promise<Rsvp> {
    const rsvpObj = {
      attending: rsvp.attending,
      eventId: rsvp.eventId,
      numberOfPeople: rsvp.numberOfPeople,
      title: rsvp.title
    };
    const rsvpDoc = this.db.doc(`registrations/${this.userId}/events/${rsvp.id}`);
    return rsvpDoc.update(rsvpObj)
      .then(() => {
        return rsvp;
      }).catch(() => {
        return null;
      });
  }

  isCurrentUserAttendingEvent(rsvpId: string): Observable<boolean> {
    return this.db
      .doc<Rsvp>(`registrations/${this.userId}/events/${rsvpId}`)
      .valueChanges()
      .pipe(map(rsvp => rsvp.attending));
  }
}
