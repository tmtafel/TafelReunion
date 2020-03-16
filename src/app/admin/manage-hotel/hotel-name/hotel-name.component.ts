import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'hotel-name',
  templateUrl: './hotel-name.component.html',
  styleUrls: ['./hotel-name.component.scss']
})
export class HotelNameComponent implements OnInit {
  @Input() name: string;
  @Output() nameChange: EventEmitter<string> = new EventEmitter();
  nameFormControl: FormControl;
  constructor() { }

  ngOnInit() {
    this.nameFormControl = new FormControl(this.name);
    this.nameFormControl.valueChanges.subscribe(newname => {
      this.name = newname;
      this.nameChange.emit(newname);
    });
  }

}
