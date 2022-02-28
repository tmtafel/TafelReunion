import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Hotel } from 'src/app/shared/models/hotel';

@Component({
  selector: 'app-manage-hotels',
  templateUrl: './manage-hotels.component.html',
  styleUrls: ['./manage-hotels.component.scss']
})
export class ManageHotelsComponent implements OnInit {

  hotels$: Observable<Hotel[]>;
  constructor(private db: AngularFirestore, private storage: AngularFireStorage) { }

  ngOnInit() {
    this.hotels$ = this.db.collection<Hotel>('hotels').snapshotChanges().pipe(map(hotels => {
      return hotels.map(htl => {
        const hotel = htl.payload.doc.data();
        hotel.id = htl.payload.doc.data().id;
        this.getImageUrl(hotel.name).subscribe(url => {
          hotel.imageUrl = url;
        });
        return hotel;
      });
    }));
  }

  getImageUrl(hotelName: string): Observable<string> {
    try {
      return this.storage.ref(`hotels/${hotelName.toLowerCase()}.jpg`).getDownloadURL().pipe(map(url => {
        return url;
      }));
    } catch (err) {
      console.log(err);
    }
  }

  editHotel(id: string) {
    console.log(id);
  }

}
