import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditorComponent } from '@ckeditor/ckeditor5-angular';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular/ckeditor.component';
@Component({
  // tslint:disable-next-line:component-selector
  selector: 'event-summary',
  templateUrl: './event-summary.component.html',
  styleUrls: ['./event-summary.component.scss']
})
export class EventSummaryComponent implements OnInit {

  @Input() summary: string;
  @Output() summaryChange: EventEmitter<string> = new EventEmitter();

  @ViewChild('editor') editorComponent: CKEditorComponent;
  public Editor = ClassicEditor;
  constructor() { }

  ngOnInit() {
  }

  public onChange({ editor }: ChangeEvent) {
    this.summaryChange.emit(editor.getData());
  }

}
