import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../auth.service';
import { Profile } from '../profile';
import { Address } from '../address';
import { Event } from '../event';
import { ProfileEvent } from './profile-event';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  loaded = false;
  profile: Profile;

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    this.authService.getCurrentProfile().subscribe(profile => {
      this.profile = profile;
      this.loaded = true;
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

  updateProfile() {
    if (typeof this.profile.id === 'undefined') {
      this.profile.id = this.authService.getCurrentUserId();
    }
    this.authService.updateProfile(this.profile).subscribe(() => {
      alert('Updated!!');
    }, err => {
      console.log(err);
      alert('Error!!');
    });
  }
}
