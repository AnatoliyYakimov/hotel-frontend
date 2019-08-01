import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {RoomsPagesRoutingModule} from './rooms-pages-routing.module';
import {RoomsPageComponent} from './rooms-page/rooms-page.component';
import {RoomsListPageComponent} from './rooms-list-page/rooms-list-page.component';
import {RoomsModule} from '../../features/rooms/rooms.module';
import {RoomDetailsPageComponent} from './room-details-page/room-details-page.component';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {SharedModule} from '../../_shared/shared.module';
import {RoomsFilterResolver} from './rooms-list-page/rooms-filter-resolver';


@NgModule({
  declarations: [
    RoomsPageComponent,
    RoomsListPageComponent,
    RoomDetailsPageComponent
  ],
  exports: [
    RoomsPageComponent
  ],
  imports: [
    CommonModule,
    RoomsModule,
    RoomsPagesRoutingModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    SharedModule
  ],
  providers: [
    {
      provide: RoomsFilterResolver,
      useValue: new RoomsFilterResolver()
    }
  ]
})
export class RoomsPagesModule {
}
