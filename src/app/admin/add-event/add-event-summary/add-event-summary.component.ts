import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditorComponent } from '@ckeditor/ckeditor5-angular';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular/ckeditor.component';
@Component({
  // tslint:disable-next-line:component-selector
  selector: 'add-event-summary',
  templateUrl: './add-event-summary.component.html',
  styleUrls: ['./add-event-summary.component.scss']
})
export class AddEventSummaryComponent implements OnInit {

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
