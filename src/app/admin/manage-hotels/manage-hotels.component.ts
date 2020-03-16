import { Component, OnInit } from '@angular/core';
import { Hotel } from 'src/app/home/hotel';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';

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
        hotel.id = htl.payload.doc.id;
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
