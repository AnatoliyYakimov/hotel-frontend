import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  checkIn: Date = new Date(Date.now());
  checkOut: Date = new Date(Date.now());

  constructor() {
  }

  ngOnInit() {
  }

}
