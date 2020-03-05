import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'profile-branch',
  templateUrl: './branch.component.html',
  styleUrls: ['./branch.component.scss']
})
export class BranchComponent implements OnInit {
  @Input() branch: string;
  @Output() branchChange: EventEmitter<string> = new EventEmitter();
  branchFormControl: FormControl;
  constructor() { }

  ngOnInit() {
    this.branchFormControl = new FormControl(this.branch);
    this.branchFormControl.valueChanges.subscribe(newBranch => {
      this.branch = newBranch;
      this.branchChange.emit(newBranch);
    });
  }

}
