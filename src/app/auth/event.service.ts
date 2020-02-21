import { Injectable } from '@angular/core';
import { FirestoreCrudService, Entity } from './firestore-crud-service.service';
import { Address } from './address';
import { firestore } from 'firebase/app';
import Timestamp = firestore.Timestamp;
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';


export interface Event extends Entity {
  address: Address;
  title: string;
  pricePerPerson: number;
  signupOpenTill: Timestamp;
  summary: string;
  when: Timestamp;
}

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private crudService;

  constructor(private afs: AngularFirestore) {
    this.crudService = new FirestoreCrudService<Event>(afs, 'events');
  }

  addEvent(address: Address, title: string, pricePerPerson: number, signupOpenTill: Date, summary: string, when: Date) {
    const sot = Timestamp.fromDate(signupOpenTill)
    const w = Timestamp.fromDate(when);
    return this.crudService.add({ address, title, pricePerPerson, sot, summary, w });
  }

  getEvent(id: string): Observable<Event> {
    return this.crudService.get(id);
  }
}
