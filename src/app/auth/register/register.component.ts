import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { Router } from '@angular/router';

import { Profile } from '../profile';
import { AuthService } from '../services/auth.service';
import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  createAccountText = 'Create Login';
  loginFormGroup: FormGroup;
  nameFormGroup: FormGroup;
  addressFormGroup: FormGroup;
  phoneFormGroup: FormGroup;
  branchFormGroup: FormGroup;

  profile: Profile;
  errorMessage: string;

  constructor(private db: AngularFirestore, private formBuilder: FormBuilder, private router: Router, private authService: AuthService, private profileService: ProfileService) {

  }

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.router.navigateByUrl(`profile`);
    }


    this.loginFormGroup = this.formBuilder.group({
      emailFormCtrl: ['', [Validators.email, Validators.required]],
      passwordFormCtrl: ['', [Validators.minLength(6), Validators.required]],
      confirmPasswordFormCtrl: ['', [Validators.minLength(6), Validators.required]]
    }, {
        validator: this.MustMatch('passwordFormCtrl', 'confirmPasswordFormCtrl')
      });

    this.nameFormGroup = this.formBuilder.group({
      firstNameFormCtrl: ['', [Validators.required]],
      lastNameFormCtrl: ['', [Validators.required]]
    });

    this.nameFormGroup.valueChanges.subscribe(nfg => {
      this.profile.firstName = nfg.firstNameFormCtrl;
      this.profile.lastName = nfg.lastNameFormCtrl;
    });

    this.addressFormGroup = this.formBuilder.group({
      streetFormCtrl: ['', [Validators.required]],
      cityFormCtrl: ['', [Validators.required]],
      stateFormCtrl: ['', [Validators.required]],
      postalCodeFormCtrl: ['', [Validators.required]],
      countryFormCtrl: ['', [Validators.required]]
    });

    this.addressFormGroup.valueChanges.subscribe(afg => {
      this.profile.address.street = afg.streetFormCtrl;
      this.profile.address.city = afg.cityFormCtrl;
      this.profile.address.state = afg.stateFormCtrl;
      this.profile.address.zip = afg.postalCodeFormCtrl;
      this.profile.address.country = afg.countryFormCtrl;
    });

    this.phoneFormGroup = this.formBuilder.group({
      phoneFormCtrl: ['', [Validators.required]]
    });

    this.phoneFormGroup.valueChanges.subscribe(pfg => {
      this.profile.phone = pfg.phoneFormCtrl;
    });

    this.branchFormGroup = this.formBuilder.group({
      branchFormCtrl: ['', [Validators.required]]
    });

    this.branchFormGroup.valueChanges.subscribe(bfg => {
      this.profile.branch = bfg.branchFormCtrl;
    });
  }

  createAccount(stepper: MatStepper) {
    this.createAccountText = 'creating...';
    const password = this.loginFormGroup.controls.passwordFormCtrl.value;
    const email = this.loginFormGroup.controls.emailFormCtrl.value;
    this.authService.register(email, password).then(credential => {
      this.profile = new Profile(credential.user.uid, credential.user.email);
      stepper.next();
    }, err => {
      console.log(err);
      this.loginFormGroup.controls.emailFormCtrl.setErrors(err.code);
      this.errorMessage = err.message;
    });
  }

  saveProfile() {
    this.profileService.updateProfile(this.profile).then((success) => {
      if (success) {
        this.router.navigateByUrl(`events`);
      }
    });
  }

  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }
}


