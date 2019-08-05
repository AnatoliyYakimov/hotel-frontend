import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomePageComponent} from './home-page/home-page.component';


const routes: Routes = [
  {
    path: '',
    component: HomePageComponent
  },
  {
    path: 'registration',
    loadChildren: './registration-page/registration-page.module#RegistrationPageModule'
  },
  {
    path: 'login',
    loadChildren: './login-page/login-page.module#LoginPageModule'
  }
  ,
  {
    path: 'admin',
    loadChildren: './pages/admin/admin.module#AdminModule'
  }
  },
  {
    path: 'profile',
    loadChildren: './pages/users/users-pages.module#UsersPagesModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
