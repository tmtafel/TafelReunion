import { Component, Input, OnInit } from '@angular/core';
import { RsvpService } from 'src/app/shared/services/rsvp.service';
import { Event } from 'src/app/shared/models/event';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'rsvp',
  templateUrl: './rsvp.component.html',
  styleUrls: ['./rsvp.component.scss']
})
export class RsvpComponent implements OnInit {

  @Input() evt: Event;
  rsvpText = '.....';
  loaded = false;
  constructor(private rsvpService: RsvpService) {

  }

  ngOnInit(): void {
    this.rsvpService.getRsvp(this.evt.id).subscribe(rsvp => {
      if (rsvp.attending) {
        this.rsvpText = `${rsvp.numberOfPeople} Tafels Going`;
      } else {
        this.rsvpText = 'Not Going';
      }
      this.loaded = true;
    });
  }

}
