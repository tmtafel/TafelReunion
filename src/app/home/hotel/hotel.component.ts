import { Component, OnInit } from '@angular/core';
import { Hotel } from 'src/app/shared/hotel';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.scss']
})
export class HotelComponent implements OnInit {
  hotels$: Observable<Hotel[]>;
  url = 'https://www.marriott.com/event-reservations/reservation-link.mi?id=1564439582731&key=GRP&app=resvlink';
  constructor(private db: AngularFirestore) { }

  ngOnInit() {
    this.hotels$ = this.db.collection<Hotel>('hotels').valueChanges();
  }

  goToHotelBooking() {
    window.open(this.url, '_blank');
  }
}
