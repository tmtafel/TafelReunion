import { Component, OnInit } from '@angular/core';
import { Rsvp } from 'src/app/shared/models/rsvp';
import { RsvpService } from 'src/app/shared/services/rsvp.service';
import { EventService } from 'src/app/shared/services/event.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'rsvps',
  templateUrl: './rsvps.component.html',
  styleUrls: ['./rsvps.component.scss']
})
export class RsvpsComponent implements OnInit {

  rsvps: Rsvp[];
  loading = false;
  breakpoint: number;
  constructor(private rsvpService: RsvpService, private eventService: EventService) {

  }

  ngOnInit() {
    this.rsvps = this.eventService.getEvents().map(evt => {
      const rsvp = new Rsvp(evt.id, evt.title);
      rsvp.imageUrl = evt.imageUrl;
      return rsvp;
    });

    this.rsvpService.getRsvpsObservable().subscribe(rsvps => {
      this.rsvps.forEach(rsvp => {
        const cRsvp = rsvps.filter(r => r.eventId === rsvp.eventId)[0];
        if (typeof (cRsvp) !== 'undefined' && cRsvp !== null) {
          rsvp.attending = cRsvp.attending;
          rsvp.numberOfPeople = cRsvp.numberOfPeople;
        }
      });
    });
  }
}
