import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';

import { Member } from '../models/member';

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  userId: string;
  members: Observable<Member[]>;

  constructor(authService: AuthService, private db: AngularFirestore) {
    this.userId = authService.getCurrentUserId();
  }

  getMembers(): Observable<Member[]> {
    return this.db.collection<Member>(`registrations/${this.userId}/members`).snapshotChanges().pipe(map(members => {
      return members.map(m => {
        const member = m.payload.doc.data();
        member.id = m.payload.doc.data().id;
        return member;
      });
    }));
  }

  addMember(member: Member) {
    this.db.collection<Member>(`registrations/${this.userId}/members`).add(member).then(m => {
      member.id = m.id;
      return member;
    }).catch(() => {
      return null;
    });
  }
}
