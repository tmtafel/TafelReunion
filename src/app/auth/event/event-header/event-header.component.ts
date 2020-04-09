import { Component, Input, OnInit } from '@angular/core';
import { Event } from 'src/app/shared/models/event';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'event-header',
  templateUrl: './event-header.component.html',
  styleUrls: ['./event-header.component.scss']
})
export class EventHeaderComponent implements OnInit {

  @Input() evt: Event;
  when: Date;

  constructor() { }

  ngOnInit(): void {
    this.when = this.evt.when.toDate();
  }

}
