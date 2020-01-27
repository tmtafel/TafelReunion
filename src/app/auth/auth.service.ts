import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormGroup } from '@angular/forms';
import * as firebase from 'firebase/app';
import { from, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn = false;
  redirectUrl: string;

  constructor(public afAuth: AngularFireAuth) { }

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

  register(loginForm: FormGroup): Observable<firebase.auth.UserCredential> {
    const email = loginForm.value.email;
    const password = loginForm.value.password;
    const registerAttempt = this.afAuth.auth.createUserWithEmailAndPassword(email, password);
    return from(registerAttempt);
  }




}
