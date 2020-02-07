import { Component } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';

import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'TafelReunion';
  loggedIn: boolean;
  constructor(public authService: AuthService, public router: Router) {

  }

  login() {
    this.router.navigateByUrl('/login');
  }

  logout(sidenav: MatSidenav) {
    sidenav.close();
    this.authService.logout();
  }

  sidenavOpened() {
    this.loggedIn = this.authService.isLoggedIn();
  }

  sidenavClosed() {
    this.loggedIn = this.authService.isLoggedIn();
  }
}
