import { Injectable } from '@angular/core';
import { Action, AngularFirestore, AngularFirestoreCollection, DocumentChangeAction, DocumentSnapshot } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Profile } from '../profile';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  userId: string;
  profile: Observable<Profile>;
  private registrations: AngularFirestoreCollection<Profile>;
  constructor(authService: AuthService, public db: AngularFirestore) {
    this.userId = authService.getCurrentUserId();
    this.registrations = db.collection<Profile>('registrations');
    this.profile = db.doc<Profile>(`registrations/${this.userId}`).valueChanges();
  }

  getCurrentProfile(): Observable<Profile> {
    return this.registrations.doc<Profile>(this.userId)
    .snapshotChanges().pipe(map(profile => {
      if (profile) {
        const prfl = profile.payload.data();
        prfl.id = profile.payload.id;
        return prfl;
      }
      return null;
    }));
  }

  updateProfile(profile: Profile): Promise<Profile> {
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
      return profile;
    }).catch(() => {
      return null;
    });
  }
}
