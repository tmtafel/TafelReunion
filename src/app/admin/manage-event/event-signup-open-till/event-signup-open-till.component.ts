import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { NgxMaterialTimepickerTheme } from 'ngx-material-timepicker';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'event-signup-open-till',
  templateUrl: './event-signup-open-till.component.html',
  styleUrls: ['./event-signup-open-till.component.scss']
})
export class EventSignupOpenTillComponent implements OnInit {

  @Input() signupOpenTill: Date;
  @Output() signupOpenTillChange: EventEmitter<Date> = new EventEmitter();

  @Input() signupExpires: boolean;
  @Output() signupExpiresChange: EventEmitter<boolean> = new EventEmitter();

  signupExpiresFormControl: FormControl;
  dateFormControl: FormControl;
  timeFormControl: FormControl;

  date: Date;
  time: string;

  minDate: Date;
  maxDate: Date;

  darkTheme: NgxMaterialTimepickerTheme = {
    container: {
      bodyBackgroundColor: '#555',
      buttonColor: '#fff'
    },
    dial: {
      dialBackgroundColor: '#f44336',
    },
    clockFace: {
      clockFaceBackgroundColor: '#f44336',
      clockHandColor: '#fff',
      clockFaceTimeInactiveColor: '#fff'
    }
  };

  constructor() {
    this.minDate = new Date(Date.now());
    this.maxDate = new Date(2020, 7, 9);
  }

  ngOnInit() {
    const dt = new Date(this.signupOpenTill);
    this.date = dt;
    this.dateFormControl = new FormControl(dt);

    const tm = this.getTimeForDatepicker(dt);
    this.time = tm;
    this.timeFormControl = new FormControl(tm);

    this.signupExpiresFormControl = new FormControl(this.signupExpires);
  }

  signupExpiresChanged(toggle: MatSlideToggleChange) {
    this.signupExpires = toggle.checked;
    this.signupExpiresChange.emit(toggle.checked);
  }

  timeChanged(tm: any) {
    this.time = tm;
    this.emitNewDate();
  }

  dateChanged(evt: MatDatepickerInputEvent<Date>) {
    this.date = evt.value;
    this.emitNewDate();
  }

  emitNewDate() {
    try {
      const minute = this.getMinuteFromDatepicker(this.time);
      const hour = this.getHourFromDatepicker(this.time);
      const day = this.date.getDate();
      const month = this.date.getMonth();
      const year = this.date.getFullYear();
      const newDate = new Date(year, month, day, hour, minute, 0);
      this.signupOpenTillChange.emit(newDate);
    } catch (error) {
      console.log(error);
    }
  }

  getMinuteFromDatepicker(time: string): number {
    return +time.split(':')[1].split(' ')[0];
  }

  getHourFromDatepicker(time: string): number {
    let hour: number = +time.split(':')[0];
    if (time.split(' ')[1].toLowerCase() === 'pm') {
      if (hour !== 12) {
        hour += 12;
      }
    } else {
      if (hour === 12) {
        hour = 0;
      }
    }
    return hour;
  }

  getTimeForDatepicker(date: Date): string {
    const hour = date.getHours();
    const minute = date.getMinutes();
    const time = hour === 0 ?
      `12:${minute} am` :
      hour < 12 ?
        `${hour}:${minute} am` :
        hour === 12 ?
          `12:${minute} pm` :
          `${hour - 12}:${minute} pm`;
    return time;
  }

}
