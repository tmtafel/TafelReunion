import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormGroup } from '@angular/forms';
import * as firebase from 'firebase/app';
import { from, Observable, of } from 'rxjs';
import { Registration } from './registration';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn = false;
  redirectUrl: string;

  constructor(public afAuth: AngularFireAuth, public db: AngularFirestore) { }

  login(loginForm: FormGroup): Observable<firebase.auth.UserCredential> {
    const email = loginForm.value.email;
    const password = loginForm.value.password;
    const loginAttempt = this.afAuth.auth.signInWithEmailAndPassword(email, password);
    return from(loginAttempt);
  }

  logout(): Observable<void> {
    const logoutAttempt = this.afAuth.auth.signOut();
    return from(logoutAttempt);
  }

  createLogin(email: string, password: string): Observable<firebase.auth.UserCredential>  {
    const createLoginAttempt = this.afAuth.auth.createUserWithEmailAndPassword(email, password);
    return from(createLoginAttempt);
  }

  register(registration: Registration): Observable<any> {
    const registerAttempt = this.db.collection('registrations').add(registration.getDocumentObject());
    return from(registerAttempt);
  }




}
