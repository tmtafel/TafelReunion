import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

import { AuthService } from '../../auth.service';
import { Event } from '../../event';
import { FormGroup } from '@angular/forms';
import { ProfileEvent } from '../profile-event';
import { MatCheckbox, MatCheckboxChange } from '@angular/material/checkbox';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {
  events: ProfileEvent[];

  constructor(private authService: AuthService, private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.events = [];
    this.authService.getCurrentProfileEvents().subscribe(userEvents => {
      this.events = userEvents;
      this.authService.getEvents().subscribe(allEvents => {
        allEvents.forEach(evt => {
          const id = evt.payload.doc.id;
          if (this.profileNeedsEvent(id)) {
            const addEvent = new ProfileEvent(id, evt.payload.doc.data().title);
            this.authService.addProfileEvent(addEvent);
          }
        });
      });
    });
  }

  profileNeedsEvent(id: string): boolean {
    let idNotFound = true;
    this.events.forEach(event => {
      if (event.id === id) {
        idNotFound = false;
      }
    });
    return idNotFound;
  }

  updateCheckbox(evt: MatCheckboxChange) {
    console.log(evt);
    const id = evt.source.id;
    const title = evt.source.name;
    const attending = evt.checked;
    const pEvent = new ProfileEvent(id, title, attending);
    this.authService.getProfileEventDocument(pEvent).subscribe(evts => {
      if (evts.length > 0) {
        const pid = evts[0].payload.doc.id;
        this.authService.updateEvent(pid, pEvent).subscribe(() => {
          this._snackBar.open('updated!!', 'exit', {
            duration: 2000,
          });
        }, err => {
          console.log(err);
          alert('Error!!');
        });
      } else {
        alert('cannot find profile event');
      }
    }, err => {
      console.log(err);
      alert('Error!!');
    });
  }
}
