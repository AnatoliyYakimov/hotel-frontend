import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RoomsPageComponent} from './rooms-page/rooms-page.component';
import {RoomDetailsPageComponent} from './room-details-page/room-details-page.component';
import {RoomsListPageComponent} from './rooms-list-page/rooms-list-page.component';
import {RoomsFilterResolver} from './rooms-list-page/rooms-filter-resolver';


const routes: Routes = [
  {
    path: '',
    component: RoomsPageComponent,
    children: [
      {
        path: '',
        component: RoomsListPageComponent,
        runGuardsAndResolvers: 'paramsOrQueryParamsChange'
      },
      {
        path: ':id',
        component: RoomDetailsPageComponent
      }
    ],
    resolve: {
      constraints: RoomsFilterResolver
    },
    runGuardsAndResolvers: 'paramsOrQueryParamsChange'
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoomsPagesRoutingModule {
}
