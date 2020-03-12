import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthService } from '../auth/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  loggedIn$: Observable<boolean>;
  currentUrl: string;
  constructor(public authService: AuthService, public router: Router, private route: ActivatedRoute) {
    this.loggedIn$ = this.authService.user.pipe(map(u => u !== null));
  }

  ngOnInit() {
  }

  login() {
    this.router.navigateByUrl('/login');
  }

  logout() {
    this.authService.logout().then(success => {
      this.router.navigateByUrl('/');
    });
  }

}
