import {Component, OnInit} from '@angular/core';
import {Room} from '../../../_shared/entities/room/room';
import {Observable} from 'rxjs';
import {RoomsService} from '../../../features/rooms/rooms.service';

@Component({
  selector: 'app-rooms-list-page',
  templateUrl: './rooms-list-page.component.html',
  styleUrls: ['./rooms-list-page.component.scss']
})
export class RoomsListPageComponent implements OnInit {
  rooms$?: Observable<Room[]>;

  constructor(private service: RoomsService) {
  }


  ngOnInit() {
    this.rooms$ = this.service.getAllRooms();
  }

}
