import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { FormGroup } from '@angular/forms';
import * as firebase from 'firebase/app';
import { User, UserInfo } from 'firebase/app';
import { from, Observable, of } from 'rxjs';

import { Registration } from './registration';
import { Profile } from './profile';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  redirectUrl: string;
  user: Observable<User>;
  private registrations: AngularFirestoreCollection<Registration>;

  constructor(public afAuth: AngularFireAuth, public db: AngularFirestore) {
    this.afAuth.authState.subscribe(this.firebaseAuthChangeListener);
    this.registrations = db.collection<Registration>('registrations');
    this.user = this.afAuth.authState;
  }

  isLoggedIn(): boolean {
    try {
      return JSON.parse(localStorage.getItem('user')) !== null;
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

  register(registration: Registration): Observable<void> {
    return from(this.registrations.doc(registration.id).set(registration.getDocumentObject()));
  }

  getCurrentProfile(): Observable<Profile> {
    const id = this.getCurrentUser().uid;
    return this.registrations.doc<Profile>(id).valueChanges();
  }

  updateProfile(profile: Profile) {
    const json = JSON.stringify(profile);
    return from(this.registrations.doc(profile.id).set(json));
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
