import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Address } from 'src/app/auth/address';
import { AngularFirestore } from '@angular/fire/firestore';
import { Hotel } from 'src/app/home/hotel';

@Component({
  selector: 'app-manage-hotel',
  templateUrl: './manage-hotel.component.html',
  styleUrls: ['./manage-hotel.component.scss']
})
export class ManageHotelComponent implements OnInit {
  hotelId: string;
  name: string;
  address: Address;
  phone: string;

  loaded = false;
  updating = false;

  imageUrl: string;

  constructor(private route: ActivatedRoute, private db: AngularFirestore) {

  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.hotelId = params.get('id');
      this.db.doc<Hotel>(`hotels/${this.hotelId}`).valueChanges().subscribe(htl => {
        this.name = htl.name;
        this.address = htl.address as Address;
        this.phone = htl.phone;
        this.imageUrl = htl.imageUrl;
        this.loaded = true;
      });
    });
  }

  updateName(newName: string) {
    this.name = newName;
  }

  updateAddress(newAddress: Address) {
    this.address = newAddress;
  }

  updatePhone(newNumber: string) {
    this.phone = newNumber;
  }

  updateImageUrl(newUrl: string) {
    this.imageUrl = newUrl;
    this.updateHotel();
  }

  updateHotel(): void {
    this.updating = true;
    const hotelObj = {
      address: {
        street: this.address.street,
        city: this.address.city,
        state: this.address.state,
        zip: this.address.zip,
        country: this.address.country
      },
      name: this.name,
      phone: this.phone,
      imageUrl: this.imageUrl
    };
    this.db.doc(`hotels/${this.hotelId}`).update(hotelObj).then(() => {
      console.log(hotelObj);
    }).catch((err) => {
      console.log(err);
      return false;
    }).finally(() => {
      this.updating = false;
    });
  }

}
