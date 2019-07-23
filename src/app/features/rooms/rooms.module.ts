import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {RoomsListComponent} from './rooms-list/rooms-list.component';
import {RoomDetailsComponent} from './room-details/room-details.component';


@NgModule({
  declarations: [
    RoomsListComponent,
    RoomDetailsComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    RoomsListComponent,
    RoomDetailsComponent
  ]
})
export class RoomsModule {
}
