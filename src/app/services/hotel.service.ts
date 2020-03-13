import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentChangeAction } from '@angular/fire/firestore';
import { Hotel } from '../shared/hotel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HotelService {
  constructor(public db: AngularFirestore) {
  }

  getHotels(): Observable<Hotel[]> {
    this.db.collection<Hotel>('hotels').snapshotChanges().subscribe(htls => {
      return htls.map(htl => {
        const hotel = htl.payload.doc.data();
        hotel.id = htl.payload.doc.id;
      });
    });
  }
}
