import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { AngularFirestore, DocumentChangeAction, DocumentSnapshot, Action, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Profile } from '../profile';
import { Observable } from 'rxjs';

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
    if (this.userId !== null) {
      db.doc<Profile>(`registrations/${this.userId}`).snapshotChanges().subscribe(this.profileChangeListener);
    }
  }

  private profileChangeListener(profileDoc: Action<DocumentSnapshot<Profile>>) {
    if (profileDoc !== null) {
      const profile = profileDoc.payload.data();
      profile.id = profileDoc.payload.id;
      const json = JSON.stringify(profile);
      localStorage.setItem('profile', json);
    } else {
      localStorage.setItem('profile', null);
    }
  }
  getCurrentProfile(): Profile {
    try {
      const profile = JSON.parse(localStorage.getItem('profile')) as Profile;
      return profile;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  updateProfile(profile: Profile): Promise<boolean> {
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
  }
}
