import {Component, Input, OnInit} from '@angular/core';
import {Room} from '../../../_shared/entities/room/room';
import {RoomsNamingService} from '../rooms-naming.service';

@Component({
  selector: 'app-room-details',
  templateUrl: './room-details.component.html',
  styleUrls: ['./room-details.component.scss']
})
export class RoomDetailsComponent implements OnInit {

  @Input() room!: Room;

  constructor(public namingService: RoomsNamingService) {
  }

  ngOnInit() {
  }

}
