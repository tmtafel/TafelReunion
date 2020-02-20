import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  showDatabaseLink = false;
  loggedIn$: Observable<boolean>;
  constructor(public authService: AuthService, public router: Router) {
    this.loggedIn$ = this.authService.user.pipe(map(u => u !== null));
  }

  ngOnInit() {
    this.authService.getCurrentProfile().subscribe(profile => {
      this.showDatabaseLink = profile.email === 'tmtafel@gmail.com';
    });
  }

  login() {
    this.router.navigateByUrl('/login');
  }

  logout() {
    this.authService.logout().subscribe(success => {
      this.router.navigateByUrl('/');
    });
  }

  goToDatabase() {
    const url = 'https://console.firebase.google.com/project/tafelreunion/database';
    window.open(url, '_blank');
  }

}
