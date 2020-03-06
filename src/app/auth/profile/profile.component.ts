import { Component, OnInit } from '@angular/core';

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
  loaded = false;
  profile: Profile;

  constructor(private profileService: ProfileService) {
  }

  ngOnInit() {
    this.profile = this.profileService.getCurrentProfile();
  }

  updateProfile() {
    this.profileService.updateProfile(this.profile).then(() => {
      alert('Updated!!');
    }, err => {
      console.log(err);
      alert('Error!!');
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
