import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'register-sign-up',
  templateUrl: './register-sign-up.component.html',
  styleUrls: ['./register-sign-up.component.scss']
})
export class RegisterSignUpComponent implements OnInit {
  loggedIn$: Observable<boolean>;

  constructor(public authService: AuthService) {
    this.loggedIn$ = this.authService.user.pipe(map(u => u !== null));
  }

  ngOnInit(): void {
  }

}
