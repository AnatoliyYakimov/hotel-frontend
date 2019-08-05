import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
// import {RegistrationPageComponent} from './registration-page/registration-page.component';
import {HomePageComponent} from './home-page/home-page.component';


const routes: Routes = [

  {
    path: '',
    component: HomePageComponent
  }
  ,
  {
    path: 'registration',
    loadChildren: './registration-page/registration-page.module#RegistrationPageModule'
  }
  ,

  {
    path: 'login',
    loadChildren: './login-page/login-page.module#LoginPageModule'
  }
  ,
  {
    path: 'admin',
    loadChildren: './pages/admin/admin.module#AdminModule'
  }
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
