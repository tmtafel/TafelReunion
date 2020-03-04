import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { NavigationExtras, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  emailError = 'Please provide a valid email address';
  passwordError = 'Password Empty';
  constructor(public authService: AuthService, public router: Router, private fb: FormBuilder, private bottomSheet: MatBottomSheet) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.router.navigateByUrl(`profile`);
    }
  }

  onSubmit() {
    if (this.loginForm.controls.password.errors) {
      this.passwordError = 'Password Empty';
      return;
    }
    if (this.loginForm.valid) {
      const email = this.loginForm.value.email;
      const password = this.loginForm.value.password;
      this.validateEmail(email, password);
    }
  }

  validateEmail(email: string, password: string) {
    this.authService.login(email, password).then(credential => {
      const redirect = this.authService.redirectUrl ? this.router.parseUrl(this.authService.redirectUrl) : '/profile';
      const navigationExtras: NavigationExtras = {
        queryParamsHandling: 'preserve',
        preserveFragment: true
      };
      this.router.navigateByUrl(redirect, navigationExtras);
    }, error => {
      const errorCode = error.code.toString();
      const errorMessage = error.message.toString();
      console.log(errorMessage);

      const errorTitle = errorCode.trim().replace('auth/', '').replace(/-/gi, ' ');
      if ((errorCode === 'auth/invalid-email') || (errorCode === 'auth/user-disabled') || (errorCode === 'auth/user-not-found')) {
        this.emailError = errorTitle;
        this.loginForm.controls.email.setErrors({ errorCode });
      } else {
        this.passwordError = errorTitle;
        this.loginForm.controls.password.setErrors({ errorCode });
      }
    });
  }
}
