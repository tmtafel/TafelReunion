import { Component, OnInit, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Member } from 'src/app/shared/models/member';
import { MemberService } from 'src/app/shared/services/member.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ProfileService } from 'src/app/shared/services/profile.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent implements OnInit {

  members: Observable<Member[]>;
  constructor(public dialog: MatDialog, private memberService: MemberService, private profileService: ProfileService) {
    this.members = this.memberService.getMembers();
  }

  ngOnInit(): void {

  }

  addMemberToGroup(): void {
    const member = new Member(this.profileService.userId);
    const addMember = this.dialog.open(AddMember, {
      width: '295px',
      data: { member }
    });

    addMember.afterClosed().subscribe(newMember => {
      console.log(newMember);
    });
  }

}

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'add-member',
  templateUrl: 'add-member.html',
})

// tslint:disable-next-line:component-class-suffix
export class AddMember {

  constructor(public addMember: MatDialogRef<AddMember>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.addMember.close();
  }

  onAddClick(): void {
    this.addMember.close(this.data.member);
  }
}
