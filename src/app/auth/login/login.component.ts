import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';

import { AuthService } from '../services/auth.service';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';

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
      if (credential.user !== null) {
        const json = JSON.stringify(credential.user);
        localStorage.setItem('user', json);
      }
      const redirect = this.authService.redirectUrl ? this.router.parseUrl(this.authService.redirectUrl) : '/profile';
      const navigationExtras: NavigationExtras = {
        queryParamsHandling: 'preserve',
        preserveFragment: true
      };
      this.router.navigateByUrl(redirect, navigationExtras);
    }, error => {
      this.loginForm.controls.password.asyncValidator
      this.passwordError = error.code.toString().trim().replace('auth/', '').replace(/-/gi, ' ');
    });
  }

  bottomPopup(header: string, message: string) {
    this.bottomSheet.open(LoginMessageComponent, {
      data: { header, message }
    });
  }
}

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'login-message',
  templateUrl: 'login-message.html',
})
export class LoginMessageComponent {
  constructor(
    private bottomSheetRef: MatBottomSheetRef<LoginMessageComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any) {
  }

  openLink(event: MouseEvent): void {
    this.bottomSheetRef.dismiss();
    event.preventDefault();
  }
}
