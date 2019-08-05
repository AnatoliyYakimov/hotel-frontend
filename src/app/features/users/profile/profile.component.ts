import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../../_shared/entities/users/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  @Input() user!: User;

  constructor() {
  }

  ngOnInit() {
  }

}
