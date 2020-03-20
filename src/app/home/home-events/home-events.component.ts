import { Component, OnInit, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';

import { HomeEvent } from '../home-event';

@Component({
  selector: 'app-home-events',
  templateUrl: './home-events.component.html',
  styleUrls: ['./home-events.component.scss']
})
export class HomeEventsComponent implements OnInit {

  events = [
    new HomeEvent('Bourbon Distillery Excursions', 'i', 'material-icons', 'local_drink'),
    new HomeEvent('Private Horse Farm Tour', 'i', 'fas fa-horse fa-lg'),
    new HomeEvent('Historic Churchill Downs', 'img', '', '../../assets/twinspires-100x100.png'),
    new HomeEvent('Farm to Table Dinner', 'i', 'fas fa-utensils fa-lg')
  ];

  loggedIn$: Observable<boolean>;
  constructor(public authService: AuthService, private sanitizer: DomSanitizer) {
    this.loggedIn$ = this.authService.user.pipe(map(u => u !== null));
  }

  ngOnInit() {
  }

  sanitize(html: string) {
    return this.sanitizer.sanitize(SecurityContext.HTML, html);
  }
}
