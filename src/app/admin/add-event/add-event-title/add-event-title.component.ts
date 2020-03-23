import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'add-event-title',
  templateUrl: './add-event-title.component.html',
  styleUrls: ['./add-event-title.component.scss']
})
export class AddEventTitleComponent implements OnInit {

  title: string = '';

  @Output() titleChange: EventEmitter<string> = new EventEmitter();
  titleFormControl: FormControl;
  constructor() { }

  ngOnInit() {
    this.titleFormControl = new FormControl(this.title);
    this.titleFormControl.valueChanges.subscribe(newtitle => {
      this.title = newtitle;
      this.titleChange.emit(newtitle);
    });
  }
}
