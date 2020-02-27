import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthService } from '../../auth.service';
import { Event } from '../../event';
import { Rsvp } from '../../rsvp';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'rsvps',
  templateUrl: './rsvps.component.html',
  styleUrls: ['./rsvps.component.scss']
})
export class RsvpsComponent implements OnInit {

  rsvps$: Observable<Rsvp[]>;
  events: Event[];
  loaded = false;
  constructor(private authService: AuthService) {
    this.rsvps$ = authService.getRsvps();

  }

  ngOnInit() {
    this.authService.getRsvps().subscribe(rsvps => {
      const rsvpsNeeded = this.authService.getEvents().filter(event => rsvps.filter(rsvp => rsvp.eventId === event.id).length === 0);
      if (rsvpsNeeded.length > 0) {
        const event = rsvpsNeeded[0];
        this.authService.addRsvp(event);
      }
    });
  }
}
