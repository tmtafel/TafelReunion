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
    console.log('sidebar opened!');
  }

  sidenavClosed() {
    console.log('sidebar closed!');
  }
}
