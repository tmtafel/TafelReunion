import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
@Component({
  // tslint:disable-next-line:component-selector
  selector: 'event-summary',
  templateUrl: './event-summary.component.html',
  styleUrls: ['./event-summary.component.scss']
})
export class EventSummaryComponent implements OnInit {

  @Input() summary: string;
  @Output() summaryChange: EventEmitter<string> = new EventEmitter();
  summaryFormControl: FormControl;

  public Editor = ClassicEditor;
  constructor() { }

  ngOnInit() {
    this.summaryFormControl = new FormControl(this.summary);
    this.summaryFormControl.valueChanges.subscribe(newsummary => {
      this.summary = newsummary;
      this.summaryChange.emit(newsummary);
    });
  }

}
