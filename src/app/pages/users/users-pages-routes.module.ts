import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserProfilePageComponent} from './user-profile-page/user-profile-page.component';

const routes: Routes = [
  {
    path: ':id',
    component: UserProfilePageComponent
  }
];


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class UsersPagesRoutesModule {
}
