import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { Router } from '@angular/router';
import { User } from 'firebase';

import { Profile } from '../profile';
import { AuthService } from '../services/auth.service';
import { ProfileService } from '../services/profile.service';
import { MustMatch } from './_helpers/must-match.validator';
import { RegisterService } from '../services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  nameFormGroup: FormGroup;
  loginFormGroup: FormGroup;
  addressFormGroup: FormGroup;
  phoneFormGroup: FormGroup;
  branchFormGroup: FormGroup;

  profile: Profile;
  errorMessage: string;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private profileService: ProfileService,
    private registerService: RegisterService
  ) {}

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.router.navigateByUrl(`profile`);
    }
    this.loginFormGroup = this.formBuilder.group({
      emailFormCtrl: ['', [Validators.email, Validators.required]],
      passwordFormCtrl: ['', [Validators.minLength(6), Validators.required]],
      confirmPasswordFormCtrl: ['', [Validators.minLength(6), Validators.required]]
    }, {
        validator: MustMatch('passwordFormCtrl', 'confirmPasswordFormCtrl')
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
    const password = this.loginFormGroup.controls.passwordFormCtrl.value;
    const email = this.loginFormGroup.controls.emailFormCtrl.value;
    this.registerService.register(email, password).then(res => {
      if (res) {
        debugger;
        this.profile = this.profileService.getCurrentProfile();
      }
    }, err => {
      console.log(err);
      this.loginFormGroup.controls.emailFormCtrl.setErrors(err.code);
      this.errorMessage = err.message;
    });
  }
}


