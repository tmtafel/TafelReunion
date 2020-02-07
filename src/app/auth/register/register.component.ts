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

  profile: Profile;
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
    })

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
  }

  createAccount(stepper: MatStepper) {
    const password = this.loginFormGroup.controls.passwordFormCtrl.value;
    const email = this.loginFormGroup.controls.emailFormCtrl.value;
    this.authService.createLogin(email, password).subscribe(res => {
      this.user = res.user;
      stepper.next();
    }, err => {
      console.log(err);
      this.loginFormGroup.controls.emailFormCtrl.setErrors(err.message);
      this.errorMessage = err.message;
    });
  }

  createUserDocument(stepper: MatStepper) {
    const firstName = this.nameFormGroup.controls.firstNameFormCtrl.value;
    const lastName = this.nameFormGroup.controls.lastNameFormCtrl.value;
    const registration = new Registration(firstName, lastName, this.user.email, this.user.uid);
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


