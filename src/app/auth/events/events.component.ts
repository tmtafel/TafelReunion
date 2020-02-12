import { Component, OnInit } from '@angular/core';

import { AuthService } from '../auth.service';
import { Event } from '../event';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

  events: Event[];
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.getEvents().subscribe(evts => {
      this.events = evts;
    });
  }

  showOptions(evt) {
    console.log(evt);
  }

}
