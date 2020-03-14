import { Component, OnInit, Input } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import { map } from 'rxjs/operators';
import { Hotel } from '../hotel';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'hotel',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.scss']
})
export class HotelComponent implements OnInit {
  @Input() hotel: Hotel;

  imageUrl: '';
  constructor(private storage: AngularFireStorage) { }

  ngOnInit() {
    try {
      this.storage.ref(`hotels/${this.hotel.name.toLowerCase()}.jpg`).getDownloadURL().subscribe(url => {
        this.imageUrl = url;
      });
    } catch (err) {
      console.log(err);
    }
  }
}
