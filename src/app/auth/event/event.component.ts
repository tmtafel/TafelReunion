import { Component, OnInit } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import { AuthService } from '../auth.service';
import { ProfileEvent } from '../profile/profile-event';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {
  id: string;
  loaded = false;
  event: ProfileEvent;
  constructor(private route: ActivatedRoute, private authService: AuthService) {

  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      // event id, not from profile
      this.id = params.get('id');
      this.authService.getProfileEventDocument(this.id).subscribe(evt => {
        this.event = evt;
      });
    });
  }

  // updateCheckbox(evt: MatCheckboxChange) {
  //   console.log(evt);
  //   const id = evt.source.id;
  //   const title = evt.source.name;
  //   const attending = evt.checked;
  //   const pEvent = new ProfileEvent(id, title, attending);
  //   this.authService.getProfileEventDocument(pEvent).subscribe(evts => {
  //     if (evts.length > 0) {
  //       const pid = evts[0].payload.doc.id;
  //       this.authService.updateEvent(pid, pEvent).subscribe(() => {
  //         // this.snackBar.open('updated!!', 'exit', {
  //         //   duration: 2000,
  //         // });
  //       }, err => {
  //         console.log(err);
  //         alert('Error!!');
  //       });
  //     } else {
  //       alert('cannot find profile event');
  //     }
  //   }, err => {
  //     console.log(err);
  //     alert('Error!!');
  //   });
}


