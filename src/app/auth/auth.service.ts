import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';

import UserCredential = firebase.auth.UserCredential;
import { User } from 'firebase/app';
import { Observable } from 'rxjs';
import { Profile } from '../shared/models/profile';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  redirectUrl: string;
  user: Observable<User>;

  constructor(public afAuth: AngularFireAuth, public db: AngularFirestore) {
    this.afAuth.authState.subscribe(this.firebaseAuthChangeListener);
    this.user = afAuth.user;
  }

  register(email: string, password: string): Promise<UserCredential> {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password);
  }

  async login(email: string, password: string): Promise<UserCredential> {
    const userCredential: UserCredential = await this.afAuth.auth.signInWithEmailAndPassword(email, password);

    this.firebaseAuthChangeListener(userCredential.user);
    return userCredential;
  }

  logout(): Promise<boolean> {
    localStorage.setItem('user', null);
    return this.afAuth.auth.signOut().then(() => {
      return true;
    }).catch(() => {
      return false;
    });
  }

  isLoggedIn(): boolean {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      return user !== null;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  getCurrentUserId(): string {
    const currentUser = this.getCurrentUser();
    return currentUser ? currentUser.uid : null;
  }

  getCurrentUserEmail(): string {
    const currentUser = this.getCurrentUser();
    return currentUser ? currentUser.email : null;
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
