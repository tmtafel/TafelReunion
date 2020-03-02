import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection, DocumentChangeAction } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { User } from 'firebase/app';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Event } from '../event';
import { Profile } from '../profile';
import { Rsvp } from '../rsvp';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  redirectUrl: string;
  user: Observable<User>;
  private registrations: AngularFirestoreCollection<Profile>;

  constructor(public afAuth: AngularFireAuth, public db: AngularFirestore) {
    this.registrations = db.collection<Profile>('registrations');

    this.afAuth.authState.subscribe(this.firebaseAuthChangeListener);
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
