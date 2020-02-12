import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Profile } from '../profile';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';


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

  phoneIsChanging(newNumber: string) {
    this.profile.phone = newNumber;
    console.log('phone is changing');
    console.log(this.profile);
  }

  updateProfile() {
    console.log(this.profile);
    // this.authService.updateProfile(this.profile).subscribe(() => {
    //   alert('Updated!!');
    // }, err => {
    //   console.log(err);
    //   alert('Error!!');
    // });
  }
}
