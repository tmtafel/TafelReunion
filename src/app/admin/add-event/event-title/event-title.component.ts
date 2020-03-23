import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'event-title',
  templateUrl: './event-title.component.html',
  styleUrls: ['./event-title.component.scss']
})
export class EventTitleComponent implements OnInit {

  @Input() title: string;
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
