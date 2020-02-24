import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthService } from '../../auth.service';
import { Rsvp } from '../../rsvp';
import { EventDetail } from '../../event';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'rsvps',
  templateUrl: './rsvps.component.html',
  styleUrls: ['./rsvps.component.scss']
})
export class RsvpsComponent implements OnInit {

  rsvps: Rsvp[];
  events: EventDetail[];

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    this.authService.getRsvps().subscribe(rsvps => {
      this.rsvps = rsvps;
      this.authService.getEvents().subscribe(events => {
        this.events = events;
      }).unsubscrib;
    });
  }
}
