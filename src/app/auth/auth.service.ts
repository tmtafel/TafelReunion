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
import { ProfileEvent } from './profile/profile-event';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  redirectUrl: string;
  user: Observable<User>;
  private registrations: AngularFirestoreCollection<Profile>;
  private events: AngularFirestoreCollection<EventDetail>;
  private profileEvents: AngularFirestoreCollection<ProfileEvent>;

  constructor(public afAuth: AngularFireAuth, public db: AngularFirestore) {
    this.registrations = db.collection<Profile>('registrations');
    this.events = db.collection<EventDetail>('events');

    this.afAuth.authState.subscribe(this.firebaseAuthChangeListener);
    this.user = this.afAuth.authState;
  }

  getCurrentProfileEvents(): Observable<ProfileEvent[]> {
    return this.profileEvents.snapshotChanges().pipe(
      map(evts => {
        return evts.map(e => {
          const evt = e.payload.doc.data();
          evt.profileEventId = e.payload.doc.id;
          return evt;
        });
      }));
  }

  getProfileEventDocument(eventId: string): Observable<ProfileEvent> {
    const id = this.getCurrentUserId();
    return this.registrations.doc(id).collection<ProfileEvent>('events', events => events.where('eventId', '==', eventId))
      .snapshotChanges().pipe(map(evts => {
        if (evts.length > 0) {
          const evt = evts[0].payload.doc.data();
          evt.profileEventId = evts[0].payload.doc.id;
          return evt;
        }
        return null;
      }));
  }

  updateEvent(pid: string, event: ProfileEvent) {
    const id = this.getCurrentUserId();
    const eventObj = {
      id: event.eventId,
      title: event.title,
      attending: event.attending
    };
    return from(this.registrations.doc(id).collection<ProfileEvent>('events').doc(pid).set(eventObj));
  }

  addProfileEvent(addEvent: AddEvent) {
    const eventObj = {
      id: addEvent.eventId,
      title: addEvent.title,
      attending: addEvent.attending
    };
    const id = this.getCurrentUserId();
    this.registrations.doc(id).collection('events').add(eventObj);
  }

  getEvents(): Observable<DocumentChangeAction<EventDetail>[]> {
    return this.events.stateChanges();
  }

  getEvent(eventId: string): Observable<Event> {
    return this.events.doc<Event>(eventId).valueChanges();
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

  logout(): Observable<void> {
    localStorage.setItem('user', null);
    return from(this.afAuth.auth.signOut());
  }

  createLogin(email: string, password: string): Observable<firebase.auth.UserCredential> {
    return from(this.afAuth.auth.createUserWithEmailAndPassword(email, password));
  }

  register(profile: Profile): Observable<void> {
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
    return from(this.registrations.doc(profile.id).set(profileObj));
  }



  getCurrentProfile(): Observable<Profile> {
    const id = this.getCurrentUserId();
    return this.registrations.doc<Profile>(id).valueChanges();
  }







  updateProfile(profile: Profile) {
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
    return from(this.registrations.doc(profile.id).set(profileObj));
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
      if (typeof (this.registrations) !== 'undefined') {
        this.profileEvents = this.registrations.doc(user.uid).collection<ProfileEvent>('events');
      }
    } else {
      localStorage.setItem('user', null);
    }
  }

}
