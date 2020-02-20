import { Component, OnInit } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import { AuthService } from '../auth.service';
import { ProfileEvent } from '../profile/profile-event';
import { EventDetail } from '../event-detail';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {
  id: string;
  attending = false;
  profileEventLoaded = false;
  profileEvent: ProfileEvent;

  eventDetailLoaded = false;
  eventDetail: EventDetail;
  loaded = false;
  constructor(private route: ActivatedRoute, private authService: AuthService, private snackBar: MatSnackBar) {

  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      // event id, not from profile
      this.id = params.get('id');
      this.authService.getEvent(this.id).subscribe(evtDtl => {
        this.eventDetail = evtDtl;
        this.eventDetailLoaded = true;
        this.checkIfLoaded();
      });
      this.authService.getProfileEventDocument(this.id).subscribe(prflEvt => {
        this.profileEvent = prflEvt;
        // this.attending = this.profileEvent.attending;
        this.profileEventLoaded = true;
        this.checkIfLoaded();
      });
    });
  }

  checkIfLoaded() {
    this.loaded = this.eventDetailLoaded && this.profileEventLoaded;
  }

  updateCheckbox(evt: MatCheckboxChange) {
    console.log(evt);
    this.profileEvent.attending = evt.checked;
    this.authService.updateEvent(this.profileEvent).subscribe(() => {
      this.snackBar.open('updated!!', 'exit', {
        duration: 2000,
      });
    }, err => {
      console.log(err);
      alert('Error!!');
    });
  }
}
