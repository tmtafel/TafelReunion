import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';

import { Member } from '../models/member';
import { Profile } from '../models/profile';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  userId: string;
  private registrations: AngularFirestoreCollection<Profile>;

  profile: Observable<Profile>;
  constructor(authService: AuthService, public db: AngularFirestore) {
    this.userId = authService.getCurrentUserId();
    this.registrations = db.collection<Profile>('registrations');
    this.db.doc<Profile>(`registrations/${this.userId}`).valueChanges().subscribe(this.profileChangeListener);
    this.profile = this.db.doc<Profile>(`registrations/${this.userId}`).valueChanges();
  }

  private profileChangeListener(prfl: Profile) {
    if (prfl) {
      const json = JSON.stringify(prfl);
      localStorage.setItem('profile', json);
    } else {
      localStorage.setItem('profile', null);
    }
  }

  isAdmin(): boolean {
    try {
      const profile = JSON.parse(localStorage.getItem('profile')) as Profile;
      if (profile && profile.roles.admin) {
        return profile.roles.admin;
      }
      return false;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  isLeader(): boolean {
    try {
      const profile = JSON.parse(localStorage.getItem('profile')) as Profile;
      if (profile && profile.roles.leader) {
        return profile.roles.leader;
      }
      return false;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  getCurrentProfile(): Observable<Profile> {
    if (this.userId) {
      return this.registrations.doc<Profile>(this.userId).snapshotChanges().pipe(map(profile => {
        if (profile) {
          const prfl = profile.payload.data();
          prfl.id = profile.payload.data().id;
          return prfl;
        }
        return null;
      }));
    }
    return null;
  }

  updateProfile(profile: Profile): Promise<Profile> {
    return this.registrations.doc(profile.id).set(profile).then(() => {
      return profile;
    }).catch(() => {
      return null;
    });
  }
}
