import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginPageComponent} from './login-page/login-page.component'; // HomePageComponent


const routes: Routes = [
  {
    path: '',
    component: LoginPageComponent
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
