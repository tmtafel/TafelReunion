import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection, DocumentChangeAction } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { User } from 'firebase/app';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { EventDetail } from './event';
import { Profile } from './profile';
import { AddEvent } from './profile/add-event';
import { Rsvp } from './rsvp';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  redirectUrl: string;
  user: Observable<User>;
  private registrations: AngularFirestoreCollection<Profile>;
  private events: AngularFirestoreCollection<EventDetail>;

  constructor(public afAuth: AngularFireAuth, public db: AngularFirestore) {
    this.registrations = db.collection<Profile>('registrations');
    this.events = db.collection<EventDetail>('events');

    this.afAuth.authState.subscribe(this.firebaseAuthChangeListener);
    this.user = this.afAuth.authState;
  }

  getRsvps(): Observable<Rsvp[]> {
    const id = this.getCurrentUserId();
    return this.registrations.doc(id).collection<Rsvp>('events').snapshotChanges().pipe(map(rsvps => {
      return rsvps.map(r => {
        const rsvp = r.payload.doc.data();
        rsvp.id = r.payload.doc.id;
        return rsvp;
      });
    }));
  }

  getRsvp(rsvpId: string): Observable<Rsvp> {
    const id = this.getCurrentUserId();
    return this.registrations.doc(id).collection<Rsvp>('events', events => events.where('eventId', '==', rsvpId))
      .snapshotChanges().pipe(map(rsvps => {
        if (rsvps.length > 0) {
          const rsvp = rsvps[0].payload.doc.data();
          rsvp.id = rsvps[0].payload.doc.id;
          return rsvp;
        }
        return null;
      }));
  }

  updateRsvp(rsvp: Rsvp): Observable<boolean> {
    const id = this.getCurrentUserId();
    const rsvpObj = {
      eventId: rsvp.eventId,
      title: rsvp.title,
      attending: rsvp.attending,
    };
    return from(this.registrations.doc(id).collection<Rsvp>('events').doc(rsvp.id).set(rsvpObj)
      .then(() => {
        return true;
      }).catch(err => {
        return false;
      }));
  }

  addRsvp(eventId: string, title: string): Observable<boolean> {
    const rsvpObj = {
      eventId,
      title,
      attending: false
    };
    const id = this.getCurrentUserId();
    return from(
      this.registrations.doc(id).collection('events').add(rsvpObj)
        .then(() => true)
        .catch(err => false));
  }

  getEvents(): Observable<EventDetail[]> {
    return this.events.snapshotChanges().pipe(map(evts => {
      return evts.map(evt => {
        const event = evt.payload.doc.data();
        event.eventId = evt.payload.doc.id;
        return event;
      });
    }));
  }

  getEventDetail(eventId: string): Observable<EventDetail> {
    return this.events.doc<EventDetail>(eventId).snapshotChanges().pipe(map(evtDtl => {
      const eventDetail = evtDtl.payload.data();
      eventDetail.eventId = evtDtl.payload.id;
      return eventDetail;
    }));
  }

  isLoggedIn(): boolean {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const loggedIn = user !== null;
      console.log(loggedIn ? 'User is logged in' : 'User is not logged in');
      return loggedIn;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  login(email: string, password: string): Observable<firebase.auth.UserCredential> {
    return from(this.afAuth.auth.signInWithEmailAndPassword(email, password));
  }

  logout(): Observable<boolean> {
    localStorage.setItem('user', null);
    return from(this.afAuth.auth.signOut().then(() => {
      return true;
    }).catch(err => {
      return false;
    }));
  }

  createLogin(email: string, password: string): Observable<firebase.auth.UserCredential> {
    return from(this.afAuth.auth.createUserWithEmailAndPassword(email, password));
  }

  register(profile: Profile): Observable<boolean> {
    const profileObj = {
      firstName: profile.firstName,
      lastName: profile.lastName,
      email: profile.email,
      address: {
        street: profile.address.street,
        city: profile.address.city,
        state: profile.address.state,
        zip: profile.address.zip,
        country: profile.address.country
      },
      phone: profile.phone
    };
    return from(this.registrations.doc(profile.id).set(profileObj).then(() => {
      return true;
    }).catch(err => {
      return false;
    }));
  }



  getCurrentProfile(): Observable<Profile> {
    const id = this.getCurrentUserId();
    return this.registrations.doc<Profile>(id).valueChanges();
  }

  updateProfile(profile: Profile): Observable<boolean> {
    const profileObj = {
      firstName: profile.firstName,
      lastName: profile.lastName,
      email: profile.email,
      address: {
        street: profile.address.street,
        city: profile.address.city,
        state: profile.address.state,
        zip: profile.address.zip,
        country: profile.address.country
      },
      phone: profile.phone
    };
    return from(this.registrations.doc(profile.id).set(profileObj).then(() => {
      return true;
    }).catch(err => {
      return false;
    }));
  }

  getCurrentUserId(): string {
    return this.getCurrentUser().uid;
  }

  getCurrentUserEmail(): string {
    return this.getCurrentUser().email;
  }

  getCurrentUser(): User {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      return user;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  private firebaseAuthChangeListener(user: User) {
    if (user !== null) {
      const json = JSON.stringify(user);
      localStorage.setItem('user', json);
    } else {
      localStorage.setItem('user', null);
    }
  }

}
