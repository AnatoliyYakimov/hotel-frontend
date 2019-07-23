import {Component, Input, OnInit} from '@angular/core';
import {Room} from '../../../_shared/entities/room/room';

@Component({
  selector: 'app-rooms-list',
  templateUrl: './rooms-list.component.html',
  styleUrls: ['./rooms-list.component.scss']
})
export class RoomsListComponent implements OnInit {
  @Input() rooms: Room[] = [];
  constructor() {
  }

  ngOnInit() {
  }

}
