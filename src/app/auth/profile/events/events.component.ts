import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { AuthService } from '../../auth.service';
import { AddEvent } from '../add-event';
import { ProfileEvent } from '../profile-event';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {
  events: ProfileEvent[];
  loaded = false;

  constructor(private authService: AuthService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.events = [];
    this.authService.getCurrentProfileEvents().subscribe(userEvents => {
      this.events = userEvents;
      this.authService.getEvents().subscribe(allEvents => {
        allEvents.forEach(evt => {
          const id = evt.payload.doc.id;
          if (this.profileNeedsEvent(id)) {
            const addEvent = new AddEvent(id, evt.payload.doc.data().title);
            this.authService.addProfileEvent(addEvent);
          }
        });
        this.loaded = true;
      });
    });
  }

  profileNeedsEvent(id: string): boolean {
    let idNotFound = true;
    this.events.forEach(event => {
      if (event.eventId === id) {
        idNotFound = false;
      }
    });
    return idNotFound;
  }
}
