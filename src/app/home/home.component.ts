import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  loggedIn$: Observable<boolean>;

  constructor(public authService: AuthService) {
    this.loggedIn$ = this.authService.user.pipe(map(u => u !== null));
  }

  ngOnInit() {
  }

}
