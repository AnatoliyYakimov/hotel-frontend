import {Component, OnInit} from '@angular/core';
import * as moment from 'moment';
import {Moment} from 'moment';


@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.scss']
})
export class RegistrationPageComponent implements OnInit {
  login?: string;
  password?: string;
  email?: string;
  name?: string;
  surname?: string;
  birthdate?: Moment = moment(Date.now());
  birthdateDatepicker?: Moment = moment(Date.now());


  constructor() {
  }

  ngOnInit() {
  }

  handleRegistrationClick() {
  }
}
