import {Component, OnInit} from '@angular/core';
// import {CurrentUserService} from 'src/app/core/_services/current-user.service';
import {Router} from '@angular/router';
import {AuthService} from '../core/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  login = '';
  password = '';

  constructor(private auth: AuthService,
              private router: Router) {
  }

  ngOnInit() {
  }

  handleLoginClick() {
    this.auth.authenticate(this.login, this.password);
  }
}
