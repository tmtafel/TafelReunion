import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'profile-phone',
  templateUrl: './phone.component.html',
  styleUrls: ['./phone.component.scss']
})
export class PhoneComponent implements OnInit {
  @Input() phone: string;
  @Output() phoneChange: EventEmitter<string> = new EventEmitter();
  phoneFormControl: FormControl;

  constructor() { }

  ngOnInit() {
    this.phoneFormControl = new FormControl(this.phone);
    this.phoneFormControl.valueChanges.subscribe(newPhone => {
      this.phone = newPhone;
      this.phoneChange.emit(newPhone);
    });
  }

}
