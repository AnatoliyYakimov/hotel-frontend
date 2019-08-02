import {Component, OnInit} from '@angular/core';
// import {CurrentUserService} from 'src/app/core/_services/current-user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  login?: string;
  password?: string;

  constructor(// private currentUserService: CurrentUserService,
    private router: Router) {
  }

  ngOnInit() {
  }

  handleLoginClick() {
  }
}
