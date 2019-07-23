import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {RoomsPageComponent} from './rooms-page/rooms-page.component';
import {RoomDetailsPageComponent} from './room-details-page/room-details-page.component';


const routes: Routes = [
  {
    path: '',
    component: RoomsPageComponent,
    children: [
      {
        path: ':id',
        component: RoomDetailsPageComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoomsPagesRoutingModule {
}
