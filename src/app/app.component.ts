import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { Router } from '@angular/router';

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

  lo
  sidenavOpened() {
    console.log('sidebar opened!');
  }

  sidenavClosed() {
    console.log('sidebar closed!');
  }
}
