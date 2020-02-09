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
  addressFormGroup: FormGroup;
  nameFormGroup: FormGroup;
  phoneFormGroup: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService) {
    this.nameFormGroup = this.formBuilder.group({
      firstNameFormCtrl: ['', [Validators.required]],
      lastNameFormCtrl: ['', [Validators.required]]
    });

    this.addressFormGroup = this.formBuilder.group({
      streetFormCtrl: ['', [Validators.required]],
      cityFormCtrl: ['', [Validators.required]],
      stateFormCtrl: ['', [Validators.required]],
      postalCodeFormCtrl: ['', [Validators.required]],
      countryFormCtrl: ['', [Validators.required]]
    });

    this.phoneFormGroup = this.formBuilder.group({
      phoneFormCtrl: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    this.authService.getCurrentProfile().subscribe(profile => {
      this.nameFormGroup.controls.firstNameFormCtrl.setValue(profile.firstName);
      this.nameFormGroup.controls.lastNameFormCtrl.setValue(profile.lastName);
      this.addressFormGroup.controls.streetFormCtrl.setValue(profile.address.street);
      this.addressFormGroup.controls.cityFormCtrl.setValue(profile.address.city);
      this.addressFormGroup.controls.stateFormCtrl.setValue(profile.address.state);
      this.addressFormGroup.controls.postalCodeFormCtrl.setValue(profile.address.zip);
      this.addressFormGroup.controls.countryFormCtrl.setValue(profile.address.country);
      this.phoneFormGroup.controls.phoneFormCtrl.setValue(profile.phone);
      this.loaded = true;
    });
  }

  updateProfile() {
    const id = this.authService.getCurrentUserId();
    const email = this.authService.getCurrentUserEmail();
    const profile = new Profile(id, email);
    profile.firstName = this.nameFormGroup.controls.firstNameFormCtrl.value;
    profile.lastName = this.nameFormGroup.controls.lastNameFormCtrl.value;
    profile.address.street = this.addressFormGroup.controls.streetFormCtrl.value;
    profile.address.city = this.addressFormGroup.controls.cityFormCtrl.value;
    profile.address.state = this.addressFormGroup.controls.stateFormCtrl.value;
    profile.address.zip = this.addressFormGroup.controls.postalCodeFormCtrl.value;
    profile.address.country = this.addressFormGroup.controls.countryFormCtrl.value;
    profile.phone = this.phoneFormGroup.controls.phoneFormCtrl.value;
    console.log(profile);
    this.authService.updateProfile(profile).subscribe(() => {
      alert('Updated!!');
    }, err => {
      console.log(err);
      alert('Error!!');
    });
  }
}
