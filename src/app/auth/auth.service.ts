import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { FormGroup } from '@angular/forms';
import * as firebase from 'firebase/app';
import { from, Observable, of } from 'rxjs';
import { User, UserInfo } from 'firebase/app';
import { Registration } from './registration';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user: Observable<firebase.User>;
  isLoggedIn = false;
  redirectUrl: string;
  private registrations: AngularFirestoreCollection<Registration>;

  constructor(public afAuth: AngularFireAuth, public db: AngularFirestore) {
    this.user = afAuth.authState;
    this.registrations = db.collection<Registration>('registrations');
  }

  login(email: string, password: string): Observable<firebase.auth.UserCredential> {
    const loginAttempt = this.afAuth.auth.signInWithEmailAndPassword(email, password);
    return from(loginAttempt);
  }

  logout(): Observable<void> {
    const logoutAttempt = this.afAuth.auth.signOut();
    return from(logoutAttempt);
  }

  createLogin(email: string, password: string): Observable<firebase.auth.UserCredential> {
    return from(this.afAuth.auth.createUserWithEmailAndPassword(email, password));
  }

  register(registration: Registration): Observable<void> {
    return from(this.db.collection<Registration>('registrations').doc(registration.id).set(registration.getDocumentObject()));
  }

}
