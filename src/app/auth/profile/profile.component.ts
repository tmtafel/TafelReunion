import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Address } from 'src/app/shared/models/address';
import { Profile } from 'src/app/shared/models/profile';
import { Roles } from 'src/app/shared/models/roles';
import { ProfileService } from 'src/app/shared/services/profile.service';

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
      if (profile) {
        this.profile = profile;
      }
    });
  }

  updateProfile() {
    try {
      if (!(this.profile.email)) {
        this.profile.email = '';
      }
      if (!(this.profile.firstName)) {
        this.profile.firstName = '';
      }
      if (!(this.profile.lastName)) {
        this.profile.lastName = '';
      }
      if (!(this.profile.address)) {
        this.profile.address = new Address();
      }
      if (!(this.profile.address.street)) {
        this.profile.address.street = '';
      }
      if (!(this.profile.address.city)) {
        this.profile.address.city = '';
      }
      if (!(this.profile.address.state)) {
        this.profile.address.state = '';
      }
      if (!(this.profile.address.zip)) {
        this.profile.address.zip = '';
      }
      if (!(this.profile.address.country)) {
        this.profile.address.country = '';
      }
      if (!(this.profile.phone)) {
        this.profile.phone = '';
      }
      if (!(this.profile.branch)) {
        this.profile.branch = '';
      }
      if (!(this.profile.roles)) {
        this.profile.roles = new Roles();
      }
      if (!(this.profile.roles.admin)) {
        this.profile.roles.admin = false;
      }
      if (!(this.profile.roles.leader)) {
        this.profile.roles.leader = false;
      }
      if (!(this.profile.roles.member)) {
        this.profile.roles.member = false;
      }
      this.profileService.updateProfile(this.profile).then(() => {
        this.snackBar.open('Updated', 'X', { duration: 3000 });
      });
    } catch (err) {
      console.log(err);
      this.snackBar.open('Error check log for details', 'X', { duration: 3000 });
    }
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


