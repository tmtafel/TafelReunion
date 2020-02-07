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
  profile: Profile;
  profileForm: FormGroup;
  constructor(private authService: AuthService) {
    this.profileForm = this.createFormGroup();
    this.authService.getCurrentProfile().subscribe(profile => {

    });
  }

  ngOnInit() {


  }

  createFormGroup() {
    return new FormGroup({
      street: new FormControl(),
      city: new FormControl(),
      state: new FormControl(),
      zip: new FormControl(),
      country: new FormControl(),
    });
  }

}
