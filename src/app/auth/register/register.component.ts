import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { Router } from '@angular/router';
import { User } from 'firebase';

import { AuthService } from '../auth.service';
import { Registration } from '../registration';
import { Profile } from '../profile';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  user: User;
  nameFormGroup: FormGroup;
  loginFormGroup: FormGroup;
  addressFormGroup: FormGroup;

  profile: Profile = new Profile();
  errorMessage: string;

  constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthService) {
  }

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.router.navigateByUrl(`profile`);
    }
    this.loginFormGroup = this.formBuilder.group({
      emailFormCtrl: ['', [Validators.email, Validators.required]],
      passwordFormCtrl: ['', [Validators.minLength(6), Validators.required]]
    });

    this.loginFormGroup.valueChanges.subscribe(lfg => {
      this.profile.email = lfg.emailFormCtrl;
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
      this.profile.street = afg.streetFormCtrl;
      this.profile.city = afg.cityFormCtrl;
      this.profile.state = afg.stateFormCtrl;
      this.profile.zip = afg.postalCodeFormCtrl;
      this.profile.country = afg.countryFormCtrl;
    });
  }

  createAccount(stepper: MatStepper) {
    const password = this.loginFormGroup.controls.passwordFormCtrl.value;
    const email = this.profile.email;
    this.authService.createLogin(email, password).subscribe(res => {
      this.user = res.user;
      this.profile.id = res.user.uid;
      stepper.next();
    }, err => {
      console.log(err);
      this.loginFormGroup.controls.emailFormCtrl.setErrors(err.message);
      this.errorMessage = err.message;
    });
  }

  createUserDocument(stepper: MatStepper) {
    const registration = new Registration(this.profile.firstName, this.profile.lastName, this.profile.email, this.user.uid);
    this.authService.register(registration).subscribe(() => {
      // this.router.navigate([`/profile/${this.user.uid}`]);
      stepper.next();
    }, err => {
      console.log(err);
      this.nameFormGroup.setErrors(err.message);
    });
  }

  addAddressToDocument() {

  }
}


