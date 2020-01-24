import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormGroup } from '@angular/forms';
import * as firebase from 'firebase/app';
import { from, Observable, of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn = false;
  redirectUrl: string;

  constructor(public afAuth: AngularFireAuth) { }

  logout(): void {
    this.isLoggedIn = false;
  }

  doRegister(value) {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
        .then(res => {
          this.isLoggedIn = true;
          resolve(res);
        }, err => {
          this.isLoggedIn = false;
          reject(err);
        });
    });
  }

  doLogin(loginForm: FormGroup): Observable<firebase.auth.UserCredential> {
    const email = loginForm.value.email;
    const password = loginForm.value.password;
    const login = from(firebase.auth().signInWithEmailAndPassword(email, password));
    return login;
  }

  doLogout() {
    return new Promise((resolve, reject) => {
      if (firebase.auth().currentUser) {
        this.afAuth.auth.signOut();
        resolve();
      } else {
        reject();
      }
    });
  }
}
