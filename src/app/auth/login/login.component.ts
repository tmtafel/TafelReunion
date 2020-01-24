import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage = '';
  message = '';

  constructor(public authService: AuthService, public router: Router, private fb: FormBuilder) {
    this.createForm();
  }

  setMessage() {
    this.message = 'Logged ' + (this.authService.isLoggedIn ? 'in' : 'out');
  }

  login() {
    this.message = 'Trying to log in ...';

    this.authService.login(this.loginForm).subscribe(
      (next) => {
        console.log(next);
        this.authService.isLoggedIn = true;
        this.setMessage();
        if (this.authService.isLoggedIn) {
          // Get the redirect URL from our auth service
          // If no redirect has been set, use the default
          const redirect = this.authService.redirectUrl ? this.router.parseUrl(this.authService.redirectUrl) : '/admin';

          // Set our navigation extras object
          // that passes on our global query params and fragment
          const navigationExtras: NavigationExtras = {
            queryParamsHandling: 'preserve',
            preserveFragment: true
          };

          // Redirect the user
          this.router.navigateByUrl(redirect, navigationExtras);
        }
      }, (error) => {
        console.log(error);
        this.authService.isLoggedIn = false;
        this.errorMessage = error.message;
        this.setMessage();
      });
  }

  logout() {
    this.authService.logout().subscribe((next) => {
      console.log(next);
      this.authService.isLoggedIn = true;
      this.setMessage();
    }, (error) => {
      console.log(error);
      this.authService.isLoggedIn = false;
      this.errorMessage = error.message;
      this.setMessage();
    });
  }

  createForm() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
}
