import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

import { AuthService } from '../auth.service';
import { Registration } from '../registration';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  nameFormGroup: FormGroup;
  loginFormGroup: FormGroup;
  email: string;
  firstName: string;
  lastName: string;

  constructor(private formBuilder: FormBuilder, private authService: AuthService) { }

  ngOnInit() {
    this.loginFormGroup = this.formBuilder.group({
      emailFormCtrl: ['', [Validators.email, Validators.required]],
      passwordFormCtrl: ['', [Validators.minLength(6), Validators.required]]
    });

    this.loginFormGroup.valueChanges.subscribe(loginFormGroup => {
      this.email = loginFormGroup.emailFormCtrl;
    });

    this.nameFormGroup = this.formBuilder.group({
      firstNameFormCtrl: ['', [Validators.required]],
      lastNameFormCtrl: ['', [Validators.required]]
    });

    this.nameFormGroup.valueChanges.subscribe(nameFormGroup =>{
      this.firstName = nameFormGroup.firstNameFormCtrl;
      this.lastName = nameFormGroup.lastNameFormCtrl;
    });
  }

  tryRegister() {
    console.log(this.nameFormGroup);
    console.log(this.loginFormGroup);
    // const first = this.nameFormGroup.controls.firstNameFormCtrl.value;
    // const last = this.nameFormGroup.controls.lastNameFormCtrl.value;
    // const email = this.loginFormGroup.controls.emailFormCtrl.value;
    // const registration = new Registration(first, last, email);
    // this.authService.register(registration);
  }

  // registerForm: FormGroup;
  // errorMessage = '';
  // successMessage = '';

  // constructor(public authService: AuthService, private fb: FormBuilder) {
  //   this.createForm();
  // }

  // createForm() {
  //   this.registerForm = this.fb.group({
  //     email: ['', Validators.required],
  //     password: ['', Validators.required]
  //   });
  // }

  // tryRegister() {
  //   this.authService.register(this.registerForm)
  //     .subscribe(res => {
  //       console.log(res);
  //       this.errorMessage = '';
  //       this.successMessage = 'Your account has been created';
  //     }, err => {
  //       console.log(err);
  //       this.errorMessage = err.message;
  //       this.successMessage = '';
  //     });
  // }

}
