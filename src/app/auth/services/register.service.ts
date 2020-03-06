import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Profile } from '../profile';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private registrations: AngularFirestoreCollection<Profile>;
  constructor(public afAuth: AngularFireAuth, public db: AngularFirestore) {
    this.registrations = db.collection<Profile>('registrations');
  }

  register(email: string, password: string): Promise<boolean> {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password).then(user => {
      const profile = new Profile(user.user.uid, email);
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
        phone: profile.phone,
        branch: profile.branch
      };
      return this.registrations.doc(profile.id).set(profileObj).then(() => {
        return true;
      }).catch(() => {
        return false;
      });
    });
  }

}
