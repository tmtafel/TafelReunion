import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.scss']
})
export class HotelComponent implements OnInit {
  slides = [];
  url = 'https://www.marriott.com/event-reservations/reservation-link.mi?id=1564439582731&key=GRP&app=resvlink';
  constructor() { }

  ngOnInit() {
    this.slides.push({ image: '../../../assets/distil.jpg' });
    this.slides.push({ image: '../../../assets/aloft.jpg' });
    this.slides.push({ image: '../../../assets/moxy.jpg' });
  }

  goToHotelBooking() {
    window.open(this.url, "_blank");
  }

}
