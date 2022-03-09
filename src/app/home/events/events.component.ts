import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Event } from 'src/app/shared/models/event';
import { map } from 'rxjs/operators';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {
  eventNames$: Observable<string[]>;

  constructor(private db: AngularFirestore) {
    this.eventNames$ = this.db.collection<Event>('events').valueChanges().pipe(map(evts => evts.map(evt => evt.title)));
  }

  ngOnInit(): void {

  }

}
