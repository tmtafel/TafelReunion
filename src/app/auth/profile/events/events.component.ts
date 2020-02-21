import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';

import { AuthService } from '../../auth.service';
import { AddEvent } from '../add-event';
import { ProfileEvent } from '../../profile-event';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {
  profileEvents$: Observable<ProfileEvent[]>;
  loaded = false;

  constructor(private authService: AuthService, private snackBar: MatSnackBar) {
    this.profileEvents$ = this.authService.getCurrentProfileEvents();
  }

  ngOnInit() {
    this.profileEvents$.subscribe(evts => {
      this.authService.getEvents().subscribe(allEvents => {
        allEvents.forEach(evt => {
          if (evts.filter(e => e.eventId === evt.eventId).length < 1) {
            const addEvent = new AddEvent(evt.eventId, evt.title);
            this.authService.addProfileEvent(addEvent);
          }
        });
      });
    });
  }
}
