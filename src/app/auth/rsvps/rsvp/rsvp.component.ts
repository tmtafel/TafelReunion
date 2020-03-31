import { Component, OnInit, Input } from '@angular/core';
import { RsvpService } from 'src/app/shared/services/rsvp.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'rsvp',
  templateUrl: './rsvp.component.html',
  styleUrls: ['./rsvp.component.scss']
})
export class RsvpComponent implements OnInit {

  @Input() eventId: string;
  attending = '.....';

  constructor(public rsvpService: RsvpService) {

  }

  ngOnInit(): void {
    this.rsvpService.getRsvp(this.eventId).subscribe(rsvp => {
      this.attending = rsvp.attending ? 'Going' : 'Not Going';
    });
  }

}
