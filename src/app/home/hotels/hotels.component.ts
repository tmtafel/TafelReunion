import { Component, OnInit } from '@angular/core';
import { Hotel } from 'src/app/home/hotel';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import { map } from 'rxjs/operators';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'hotels',
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.scss']
})
export class HotelsComponent implements OnInit {
  hotels$: Observable<Hotel[]>;
  url = 'https://www.marriott.com/event-reservations/reservation-link.mi?id=1564439582731&key=GRP&app=resvlink';
  constructor(private db: AngularFirestore) { }

  ngOnInit() {
    this.hotels$ = this.db.collection<Hotel>('hotels').snapshotChanges().pipe(map(hotels => {
      return hotels.map(htl => {
        const hotel = htl.payload.doc.data();
        hotel.id = htl.payload.doc.id;
        return hotel;
      });
    }));
  }

  goToHotelBooking() {
    window.open(this.url, '_blank');
  }

}
