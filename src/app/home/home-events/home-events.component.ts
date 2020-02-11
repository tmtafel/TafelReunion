import { Component, OnInit } from '@angular/core';
import { HomeEvent } from '../home-event';

@Component({
  selector: 'app-home-events',
  templateUrl: './home-events.component.html',
  styleUrls: ['./home-events.component.scss']
})
export class HomeEventsComponent implements OnInit {

  events = [
    new HomeEvent('Bourbon Distillery Excursions', 'i', 'material-icons', 'local_drink'),
    new HomeEvent('Private Horse Farm Tour', 'i', 'fas fa-horse fa-lg'),
    new HomeEvent('Historic Churchill Downs', 'img', '', '../../assets/twinspires-100x100.png'),
    new HomeEvent('Farm to Table Dinner', 'i', 'fas fa-utensils fa-lg' )
  ];
  constructor() { }

  ngOnInit() {
  }

}
