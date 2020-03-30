import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Event } from 'src/app/shared/models/event';
import { Rsvp } from 'src/app/shared/models/rsvp';
import { EventService } from 'src/app/shared/services/event.service';
import { RsvpService } from 'src/app/shared/services/rsvp.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'rsvps',
  templateUrl: './rsvps.component.html',
  styleUrls: ['./rsvps.component.scss']
})
export class RsvpsComponent implements OnInit {

  events: Observable<Event[]>;
  loading = false;
  breakpoint: number;
  constructor(private rsvpService: RsvpService, private eventService: EventService) {
  }

  ngOnInit() {
    this.loading = true;
    this.events = this.eventService.getEvents();

    // this.rsvps = this.rsvpService.getRsvpsObservable().subscribe(rsvps => {
    //   return this.rsvps.forEach(rsvp => {
    //     const cRsvp = rsvps.filter(r => r.eventId === rsvp.eventId)[0];
    //     if (typeof (cRsvp) !== 'undefined' && cRsvp !== null) {
    //       rsvp.attending = cRsvp.attending;
    //       rsvp.numberOfPeople = cRsvp.numberOfPeople;
    //     }
    //   });
    // });
  }
}
