import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';

import UserCredential = firebase.auth.UserCredential;
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  emailError = 'Please provide a valid email address';
  passwordError = 'Password Empty';
  constructor(public authService: AuthService, public router: Router, private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.router.navigateByUrl(`events`);
    }
  }

  async onSubmit() {
    try {
      const email = this.loginForm.value.email;
      const password = this.loginForm.value.password;
      const credential: UserCredential = await this.authService.login(email, password);
      if (credential) {
        const json = JSON.stringify(credential.user);
        localStorage.setItem('user', json);
        this.router.navigateByUrl('events');
      }
    } catch (error) {
      let errorMessage = 'Error Uknown';
      if (error) {
        errorMessage = 'Check Log for Error.';
        console.log(error);
        const errorCode = error.code.toString();
        if (error.message) {
          errorMessage = errorMessage ? `${errorMessage}: ${error.message}` : error.message;
        }
        const errorTitle = errorCode.trim().replace('auth/', '').replace(/-/gi, ' ');
        if ((errorCode === 'auth/invalid-email') || (errorCode === 'auth/user-disabled') || (errorCode === 'auth/user-not-found')) {
          this.emailError = errorTitle;
          this.loginForm.controls.email.setErrors({ errorCode });
        } else {
          this.passwordError = errorTitle;
          this.loginForm.controls.password.setErrors({ errorCode });
        }
      }
    }
  }
}

