import { Component, OnInit } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
import { ValidationErrors, AbstractControl, FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

import { AuthService } from '../auth.service';
import { User } from 'firebase';
import { IfStmt } from '@angular/compiler';
import { Registration } from '../registration';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  user: User;
  nameFormGroup: FormGroup;
  loginFormGroup: FormGroup;

  errorMessage: string;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
    this.loginFormGroup = this.formBuilder.group({
      emailFormCtrl: ['', [Validators.email, Validators.required]],
      passwordFormCtrl: ['', [Validators.minLength(6), Validators.required]]
    });

    this.nameFormGroup = this.formBuilder.group({
      firstNameFormCtrl: ['', [Validators.required]],
      lastNameFormCtrl: ['', [Validators.required]]
    });
  }


  createAccount(stepper: MatStepper) {
    const password = this.loginFormGroup.controls.passwordFormCtrl.value;
    const email = this.loginFormGroup.controls.emailFormCtrl.value;
    this.authService.createLogin(email, password).subscribe(res => {
      this.authService.login(email, password).subscribe(res2 => {
        this.user = res2.user;
        stepper.next();
      });
    }, err => {
      console.log(err);
      this.loginFormGroup.controls.emailFormCtrl.setErrors(err.message);
      this.errorMessage = err.message;
    });
  }



  createUserDocument() {
    const firstName = this.nameFormGroup.controls.firstNameFormCtrl.value;
    const lastName = this.nameFormGroup.controls.lastNameFormCtrl.value;
    const registration = new Registration(firstName, lastName, this.user.email, this.user.uid);
    this.authService.register(registration).subscribe(res => {
      this.router.navigate([`/profile/${this.user.uid}`]);
    }, err => {
      console.log(err);
      this.nameFormGroup.setErrors(err.message);
    });
  }
}


