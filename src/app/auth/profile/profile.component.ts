import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Address } from '../address';
import { Profile } from '../profile';
import { AuthService } from '../services/auth.service';
import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profile: Profile;

  constructor(private profileService: ProfileService, private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.profileService.getCurrentProfile().subscribe(profile => {
      this.profile = profile;
    });
  }

  updateProfile() {
    this.profileService.updateProfile(this.profile).then(() => {
      this.snackBar.open('Updated', 'X', { duration: 3000 });
    }, err => {
      console.log(err);
      this.snackBar.open('Error', 'X', { duration: 3000 });
    });
  }

  updateFirstName(newFirstName: string) {
    this.profile.firstName = newFirstName;
  }

  updateLastName(newLastName: string) {
    this.profile.lastName = newLastName;
  }

  updateAddress(newAddress: Address) {
    this.profile.address = newAddress;
  }
  updatePhone(newNumber: string) {
    this.profile.phone = newNumber;
  }

  updateBranch(newBranch: string) {
    this.profile.branch = newBranch;
  }

}
