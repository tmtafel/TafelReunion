import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { User } from 'firebase/app';

import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage = '';
  message = '';
  constructor(public authService: AuthService, public router: Router, private fb: FormBuilder) {
    this.createForm();
  }

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.router.navigateByUrl(`profile`);
    }
  }

  setMessage() {
    this.message = 'Logged ' + (this.authService.isLoggedIn() ? 'in' : 'out');
  }

  login() {
    this.message = 'Trying to log in ...';
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;
    this.authService.login(email, password).subscribe(
      (credential) => {
        if (credential.user !== null) {
          const json = JSON.stringify(credential.user);
          localStorage.setItem('user', json);
        }
        console.log(credential);
        this.setMessage();
        const redirect = this.authService.redirectUrl ? this.router.parseUrl(this.authService.redirectUrl) : '/profile';
        const navigationExtras: NavigationExtras = {
          queryParamsHandling: 'preserve',
          preserveFragment: true
        };
        this.router.navigateByUrl(redirect, navigationExtras);

      }, (error) => {
        console.log(error);
        this.errorMessage = error.message;
        this.setMessage();
      });
  }

  logout() {
    this.authService.logout().subscribe((next) => {
      console.log(next);
      this.setMessage();
    }, (error) => {
      console.log(error);
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
