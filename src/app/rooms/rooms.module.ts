import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {RoomsComponent} from './rooms.component';
import {RoomsListComponent} from './rooms-list/rooms-list.component';
import {RoomDetailsComponent} from './room-details/room-details.component';
import {RoomsListPageComponent} from './pages/rooms-list-page/rooms-list-page.component';
import {RoomDetailsPageComponent} from './room-details-page/room-details-page.component';


@NgModule({
  declarations: [
    RoomsComponent,
    RoomsListComponent,
    RoomDetailsComponent,
    RoomsListPageComponent,
    RoomDetailsPageComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule
  ]
})
export class RoomsModule {
}
