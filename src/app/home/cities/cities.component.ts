import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.scss']
})
export class CitiesComponent implements OnInit {

  cities = [
    'Nashville',
    'Lexington',
    'Cincinnati',
    'Indianapolis',
    'Knoxville',
    'St. Louis'
  ];
  constructor() { }

  ngOnInit() {
  }

}
