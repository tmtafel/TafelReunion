import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './auth/auth.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  loggedIn$: Observable<boolean>;
  constructor(public authService: AuthService, public router: Router) {
    this.loggedIn$ = this.authService.user.pipe(map(u => u !== null));
  }

  login() {
    this.router.navigateByUrl('/login');
  }

  logout() {
    this.authService.logout().subscribe(success => {
      this.router.navigateByUrl('/');
    });
  }

}
