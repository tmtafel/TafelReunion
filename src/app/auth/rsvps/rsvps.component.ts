import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Event } from '../event';
import { Rsvp } from '../rsvp';
import { EventService } from '../services/event.service';
import { RsvpService } from '../services/rsvp.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'rsvps',
  templateUrl: './rsvps.component.html',
  styleUrls: ['./rsvps.component.scss']
})
export class RsvpsComponent implements OnInit {

  rsvps$: Observable<Rsvp[]>;
  events: Event[];
  loading = false;
  breakpoint: number;
  constructor(private rsvpService: RsvpService, private eventService: EventService) {
    this.rsvps$ = rsvpService.getRsvpsObservable();
  }

  ngOnInit() {
    this.breakpoint = (window.innerWidth <= 400) ? 1 : 6;
    const rsvps = this.rsvpService.getRsvps();
    const events = this.eventService.getEvents();
    if ((rsvps !== null || typeof rsvps !== 'undefined') && (events !== null || typeof events !== 'undefined')) {
      events.forEach(evt => {
        if (rsvps.filter(r => r.eventId === evt.id).length === 0) {
          this.rsvpService.addRsvp(evt);
        }
      });
    }
  }
  // breakpoints: 
  //   Extra small screen / phone
  //   xs: 0,

  //   Small screen / phone
  //   sm: 576px,

  //   Medium screen / tablet
  //   md: 768px,

  //   Large screen / desktop
  //   lg: 992px,

  //   Extra large screen / wide desktop
  //   xl: 1200px

  onResize(event) {
    const width = event.target.innerWidth;
    if (width > 1200) {
      this.breakpoint = 5;
    } else if (width > 992) {
      this.breakpoint = 4;
    } else if (width > 768) {
      this.breakpoint = 3;
    } else if (width > 576) {
      this.breakpoint = 2;
    } else {
      this.breakpoint = 1;
    }
  }
}
