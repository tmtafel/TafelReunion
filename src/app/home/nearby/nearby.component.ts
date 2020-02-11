import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nearby',
  templateUrl: './nearby.component.html',
  styleUrls: ['./nearby.component.scss']
})
export class NearbyComponent implements OnInit {

  attractions = [
    'Hit the “Bourbon Trail” & experience world renown brands like Pappy, Wild Turkey, Jim Beam, or Maker’s Mark',
    'Experience the Muhammed Ali center, Historic Frazier Museum, America’s last Steamboat, and Glass Blowing',
    'Explore North America’s largest collection or Victorian iron storefronts along historic Main Street',
    'Roam the “Urban Bourbon Trail” with over seven distilleries within walking distance of the hotel',
    'Wander through Riverfront park, stroll across the pedestrian bridge, and visit historic town of Jeffersonville',
    'Take in some craft beer, throw axes, and enjoy nationally acclaimed “foodie” restaurants along Market Street'
  ];
  constructor() { }

  ngOnInit() {
  }

}
