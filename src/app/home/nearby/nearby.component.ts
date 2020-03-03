import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nearby',
  templateUrl: './nearby.component.html',
  styleUrls: ['./nearby.component.scss']
})
export class NearbyComponent implements OnInit {

  attractions = [
    {
      title: 'Bourbon Trail',
      content: 'Hit the “Bourbon Trail” & experience world renown brands like Pappy, Wild Turkey, Jim Beam, or Maker’s Mark'
    },
    {
      title: 'Museums',
      content: 'Experience the Muhammed Ali center, Historic Frazier Museum, America’s last Steamboat, and Glass Blowing'
    },
    {
      title: 'Main Street',
      content: 'Explore North America’s largest collection or Victorian iron storefronts along historic Main Street'
    },
    {
      title: 'Urban Bourbon Trail',
      content: 'Roam the “Urban Bourbon Trail” with over seven distilleries within walking distance of the hotel'
    },
    {
      title: 'Waterfront',
      content: 'Wander through Riverfront park, stroll across the pedestrian bridge, and visit historic town of Jeffersonville'
    },
    {
      title: 'Nulu',
      content: 'Take in some craft beer, throw axes, and enjoy nationally acclaimed “foodie” restaurants along Market Street'
    }
  ];
  constructor() { }

  ngOnInit() {
  }

}
