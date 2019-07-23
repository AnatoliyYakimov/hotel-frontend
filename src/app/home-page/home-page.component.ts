import {Component, OnInit} from '@angular/core';
import * as moment from 'moment';
import {Moment} from 'moment';
import {Router} from '@angular/router';
import {DATE_CONSTANTS} from '../_shared/date-constants';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  checkIn: Moment = moment(Date.now());
  checkOut: Moment = moment(this.checkIn).add(1, 'days');

  constructor(private router: Router) {
  }

  onClick() {
    this.router.navigate(['rooms'], {
      queryParams: {
        checkIn: this.checkIn.format(DATE_CONSTANTS.SHORTDATE),
        checkOut: this.checkOut.format(DATE_CONSTANTS.SHORTDATE)
      }
    });
  }

  ngOnInit() {
  }

}
