import {Component, OnInit} from '@angular/core';
import * as moment from 'moment';
import {Moment} from 'moment';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  checkIn: Moment = moment(Date.now());
  checkOut: Moment = moment(this.checkIn).add(1, 'days');

  constructor() {
  }

  ngOnInit() {
  }

}
