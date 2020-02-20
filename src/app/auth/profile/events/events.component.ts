import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';

import { AuthService } from '../../auth.service';
import { AddEvent } from '../add-event';
import { ProfileEvent } from '../profile-event';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {
  // events: ProfileEvent[];
  profileEvents$: Observable<ProfileEvent[]>;
  profileEventIds: string[];
  loaded = false;

  constructor(private authService: AuthService, private snackBar: MatSnackBar) {
    this.profileEvents$ = this.authService.getCurrentProfileEvents();
  }

  ngOnInit() {
    this.profileEvents$.subscribe(evts => {
      this.profileEventIds = evts.map(evt => evt.eventId);
      this.authService.getEvents().subscribe(allEvents => {
        allEvents.forEach(evt => {
          const id = evt.payload.doc.id;
          if (this.profileNeedsEvent(id)) {
            const addEvent = new AddEvent(id, evt.payload.doc.data().title);
            this.authService.addProfileEvent(addEvent);
          }
        });
      });
    });

  }

  profileNeedsEvent(id: string): boolean {
    let idNotFound = true;
    this.profileEventIds.forEach(eventId => {
      if (eventId === id) {
        idNotFound = false;
      }
    });
    return idNotFound;
  }
}
