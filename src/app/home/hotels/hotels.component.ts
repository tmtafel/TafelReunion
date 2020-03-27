import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Hotel } from 'src/app/shared/models/hotel';

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

  getPhoneNumberFormatted(phone: string) {
    const phoneStripped = phone.replace(/\D/g, '');
    if (phoneStripped.length !== 10) { return phone; }
    const areaCode = phoneStripped.substring(0, 3);
    const prefix = phoneStripped.substring(3, 6);
    const lineNumber = phoneStripped.substr(6, 10);
    return `${areaCode}-${prefix}-${lineNumber}`;
  }
}
