import { Component, OnInit } from '@angular/core';
import { HotelService } from 'src/app/services/hotel.service';
import { Hotel } from 'src/app/shared/hotel';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.scss']
})
export class HotelComponent implements OnInit {
  hotels$: Hotel[];
  url = 'https://www.marriott.com/event-reservations/reservation-link.mi?id=1564439582731&key=GRP&app=resvlink';
  constructor(private db: AngularFirestore) { }

  ngOnInit() {
    this.hotels = this.db..getHotels();
  }

  goToHotelBooking() {
    window.open(this.url, '_blank');
  }

}
