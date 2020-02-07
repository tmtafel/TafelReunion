import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Profile } from '../profile';
import { FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profile: Profile;
  email: FormControl;
  first: FormControl;
  last: FormControl;
  street: FormControl;
  city: FormControl;
  stateOrProvince: FormControl;
  zip: FormControl;
  country: FormControl;
  constructor(private authService: AuthService) {
    this.authService.getCurrentProfile().subscribe(profile => {
      this.email = new FormControl({ value: profile.email, disabled: true }, [Validators.required, Validators.email]);
      this.email.valueChanges.pipe().subscribe(eml => {
        this.profile.email = eml;
      });

      this.first = new FormControl(profile.firstName, [Validators.required]);
      this.first.valueChanges.pipe().subscribe(frst => {
        this.profile.firstName = frst;
      });

      this.last = new FormControl(profile.lastName, [Validators.required]);
      this.last.valueChanges.pipe().subscribe(lst => {
        this.profile.firstName = lst;
      });
      this.street = new FormControl(profile.street);
      this.city = new FormControl(profile.city);
      this.stateOrProvince = new FormControl(profile.state);
      this.zip = new FormControl(profile.zip);
      this.country = new FormControl(profile.country);

      this.profile = profile;
    });
  }

  ngOnInit() {


  }

  updateCurrentProfile() {
    console.log(this.profile);
  }

}
