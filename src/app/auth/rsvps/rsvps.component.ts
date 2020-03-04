import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Event } from '../event';
import { Rsvp } from '../rsvp';
import { AuthService } from '../services/auth.service';
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
  constructor(private rsvpService: RsvpService, private eventService: EventService) {
    this.rsvps$ = rsvpService.getRsvpsObservable();
  }

  ngOnInit() {
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
}


@ViewChild('gridView') gridView;

  columnNum = 3;

  divSize = 900;

  setColNum(div){
    // console.log(div);
    if(this.gridView.nativeElement.offsetWidth < 400){
      this.columnNum = 1;
    }
    if(this.gridView.nativeElement.offsetWidth >= 400 
        && this.gridView.nativeElement.offsetWidth < 800){
      this.columnNum = 2;
    }
    if(this.gridView.nativeElement.offsetWidth >= 800){
      this.columnNum = 3;
    }
}