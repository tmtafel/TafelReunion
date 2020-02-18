import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection, DocumentChangeAction } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { User } from 'firebase/app';
import { from, Observable } from 'rxjs';

import { Event } from './event';
import { Profile } from './profile';
import { ProfileEvent } from './profile/profile-event';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  redirectUrl: string;
  user: Observable<User>;
  private registrations: AngularFirestoreCollection<Profile>;
  private events: AngularFirestoreCollection<Event>;
  private userEvents: AngularFirestoreCollection<Event>;

  constructor(public afAuth: AngularFireAuth, public db: AngularFirestore) {
    this.afAuth.authState.subscribe(this.firebaseAuthChangeListener);
    this.registrations = db.collection<Profile>('registrations');
    this.events = db.collection<Event>('events');
    this.user = this.afAuth.authState;
  }

  getProfileEventDocument(eventId: string) {
    const id = this.getCurrentUserId();
    return this.registrations.doc(id)
      .collection<ProfileEvent>('events', events => events.where('id', '==', eventId))
      .snapshotChanges();
  }

  updateEvent(pid: string, event: ProfileEvent) {
    const id = this.getCurrentUserId();
    const eventObj = {
      id: event.id,
      title: event.title,
      attending: event.attending
    };
    return from(this.registrations.doc(id).collection<ProfileEvent>('events').doc(pid).set(eventObj));
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

  getCurrentUserId(): string {
    return this.getCurrentUser().uid;
  }

  getCurrentUserEmail(): string {
    return this.getCurrentUser().email;
  }

  getCurrentProfile(): Observable<Profile> {
    const id = this.getCurrentUserId();
    return this.registrations.doc<Profile>(id).valueChanges();
  }

  getCurrentProfileEvents(): Observable<ProfileEvent[]> {
    const id = this.getCurrentUserId();
    return this.registrations.doc(id).collection<ProfileEvent>('events').valueChanges();
  }

  getEvents(): Observable<DocumentChangeAction<Event>[]> {
    return this.events.snapshotChanges();
  }

  getEvent(eventId: string): Observable<Event> {
    return this.events.doc<Event>(eventId).valueChanges();
  }



  addProfileEvent(event: ProfileEvent) {
    const eventObj = {
      id: event.id,
      title: event.title,
      attending: event.attending
    };
    const id = this.getCurrentUserId();
    this.registrations.doc(id).collection('events').add(eventObj);
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
