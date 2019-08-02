import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UsersPagesRoutesModule} from './users-pages-routes.module';
import {UserProfilePageComponent} from './user-profile-page/user-profile-page.component';


@NgModule({
  declarations: [UserProfilePageComponent],
  imports: [
    CommonModule,
    UsersPagesRoutesModule
  ]
})
export class UsersPagesModule {
}
