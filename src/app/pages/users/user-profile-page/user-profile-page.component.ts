import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {User} from '../../../_shared/entities/users/user';
import {EMPTY, Observable} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {UserService} from '../../../features/users/user.service';

@Component({
  selector: 'app-user-profile-page',
  templateUrl: './user-profile-page.component.html',
  styleUrls: ['./user-profile-page.component.scss']
})
export class UserProfilePageComponent implements OnInit {
  user$: Observable<User> = EMPTY;

  constructor(private route: ActivatedRoute, private service: UserService) {
    this.user$ = route.params.pipe(
      switchMap(value => this.service.getUser(value.id as number))
    );
  }

  ngOnInit() {
  }

}
