import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Signup } from 'src/app/signup.model'

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private firestore: AngularFirestore) { }

  getSignups() {
    return this.firestore.collection('signups').snapshotChanges();
  }

  async createSignup(name: string) {
    const signup = new Signup(name);
    await this.firestore.collection('signups').add(signup.getDocumentObject());
  }

  updateSignup(signup: Signup) {
    delete signup.id;
    this.firestore.doc('signups/' + signup.id).update(signup);
  }

  deleteSignup(signupId: string) {
    this.firestore.doc('signups/' + signupId).delete();
  }
}
