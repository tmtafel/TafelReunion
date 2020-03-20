import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthService } from '../auth/auth.service';
import { ProfileService } from '../auth/services/profile.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  loggedIn$: Observable<boolean>;
  isAdmin$: Observable<boolean>;
  currentUrl: string;
  constructor(public authService: AuthService, public router: Router, private profileService: ProfileService) {
    this.loggedIn$ = this.authService.user.pipe(map(u => u !== null));
    this.isAdmin$ = this.profileService.profile.pipe(map(p => {
      if (p.admin) {
        return p.admin;
      }
      return false;
    }));
  }

  ngOnInit() {
  }

  login() {
    this.router.navigateByUrl('/login');
  }

  logout() {
    this.authService.logout().then(() => {
      this.router.navigateByUrl('/');
    });
  }

}
