import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UsersPagesRoutesModule} from './users-pages-routes.module';
import {UserProfilePageComponent} from './user-profile-page/user-profile-page.component';
import {AppModule} from '../../app.module';
import {UserModule} from '../../features/users/user.module';


@NgModule({
  declarations: [UserProfilePageComponent],
  imports: [
    CommonModule,
    UserModule,
    UsersPagesRoutesModule,
    AppModule
  ]
})
export class UsersPagesModule {
}
