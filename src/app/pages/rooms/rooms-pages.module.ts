import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {RoomsPagesRoutingModule} from './rooms-pages-routing.module';
import {RoomsPageComponent} from './rooms-page/rooms-page.component';
import {RoomsListPageComponent} from './rooms-list-page/rooms-list-page.component';
import {RoomsModule} from '../../features/rooms/rooms.module';
import {RoomDetailsPageComponent} from './room-details-page/room-details-page.component';


@NgModule({
  declarations: [
    RoomsPageComponent,
    RoomsListPageComponent,
    RoomDetailsPageComponent
  ],
  imports: [
    CommonModule,
    RoomsModule,
    RoomsPagesRoutingModule
  ]
})
export class RoomsPagesModule {
}
