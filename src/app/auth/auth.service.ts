import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { FormGroup } from '@angular/forms';
import * as firebase from 'firebase/app';
import { User, UserInfo } from 'firebase/app';
import { from, Observable, of } from 'rxjs';

import { Event } from './event';
import { Profile } from './profile';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  redirectUrl: string;
  user: Observable<User>;
  private registrations: AngularFirestoreCollection<Profile>;
  private events: AngularFirestoreCollection<Event>;

  constructor(public afAuth: AngularFireAuth, public db: AngularFirestore) {
    this.afAuth.authState.subscribe(this.firebaseAuthChangeListener);
    this.registrations = db.collection<Profile>('registrations');
    this.events = db.collection<Event>('events');
    this.user = this.afAuth.authState;
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
    return from(this.registrations.doc(profile.id).set(profile.getDocumentObject()));
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

  getEvents(): Observable<Event[]> {
    return this.events.valueChanges();
  }

  updateProfile(profile: Profile) {
    return from(this.registrations.doc(profile.id).set(profile.getDocumentObject()));
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
