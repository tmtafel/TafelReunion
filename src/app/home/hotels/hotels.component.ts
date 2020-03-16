import { Component } from '@angular/core';
import { Hotel } from 'src/app/home/hotel';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'hotels',
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.scss']
})
export class HotelsComponent {
  hotels$: Observable<Hotel[]>;
  url = 'https://www.marriott.com/event-reservations/reservation-link.mi?id=1564439582731&key=GRP&app=resvlink';
  constructor(private db: AngularFirestore) {
    this.hotels$ = this.db.collection<Hotel>('hotels').valueChanges();
  }

  goToHotelBooking() {
    window.open(this.url, '_blank');
  }

}
