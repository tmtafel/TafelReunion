import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Event } from 'src/app/shared/models/event';
import { EventService } from 'src/app/shared/services/event.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'rsvps',
  templateUrl: './rsvps.component.html',
  styleUrls: ['./rsvps.component.scss']
})
export class RsvpsComponent implements OnInit {

  events: Observable<Event[]>;
  loading = false;

  constructor(private eventService: EventService) {
  }

  ngOnInit() {
    this.loading = true;
    this.events = this.eventService.getLiveEvents();
  }

}
