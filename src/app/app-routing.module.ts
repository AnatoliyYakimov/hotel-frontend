import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RegistrationPageComponent} from './registration-page/registration-page.component';


const routes: Routes = [
  {
    path: '',
    component: RegistrationPageComponent
  },
  /*{
    path: 'rooms',
    loadChildren: './pages/rooms/rooms-pages.module#RoomsPagesModule'
  }*/
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
