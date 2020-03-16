import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
@Component({
  // tslint:disable-next-line:component-selector
  selector: 'event-when',
  templateUrl: './event-when.component.html',
  styleUrls: ['./event-when.component.scss']
})
export class EventWhenComponent implements OnInit {

  @Input() when: Date;
  @Output() whenChange: EventEmitter<Date> = new EventEmitter();

  date: Date;
  time: Date;
  dateFormControl: FormControl;
  private exportTime = { hour: 7, minute: 15, meriden: 'PM', format: 24 };

  constructor() {
  }

  ngOnInit() {

    this.date = this.when;
    this.time = this.when;
    this.dateFormControl = new FormControl(this.date);
    // this.timeFormControl = new FormControl(this.time);
  }

  dateChanged(evt: MatDatepickerInputEvent<Date>) {
    const minute = this.time.getMinutes();
    const hour = this.time.getHours();
    const day = this.date.getDate();
    const month = this.date.getMonth();
    const year = this.date.getFullYear();
    const newDate = new Date(year, month, day, hour, minute, 0);
    this.whenChange.emit(newDate);
  }

}
