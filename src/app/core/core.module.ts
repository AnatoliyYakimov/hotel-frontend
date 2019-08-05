import {isDevMode, NgModule, Optional, SkipSelf} from '@angular/core';
import {CommonModule} from '@angular/common';
import {throwError} from 'rxjs';
import {HeaderComponent} from './header/header.component';
import {BodyComponent} from './body/body.component';
import {FooterComponent} from './footer/footer.component';
import {HomePageComponent} from './home-page/home-page.component';
import {RouterModule} from '@angular/router';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {INTERCEPTOR_PROVIDER} from './_interceptors/interceptors-provider';
import {TOKEN_INTERCEPTOR_PROVIDER} from './_interceptors/token-interceptor';


@NgModule({
  declarations: [
    HeaderComponent,
    BodyComponent,
    FooterComponent,
    HomePageComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatInputModule,
    MatDatepickerModule,
    MatToolbarModule,
    MatButtonModule
  ],
  exports: [
    HeaderComponent,
    BodyComponent,
    FooterComponent
  ],
  providers: [
    ...INTERCEPTOR_PROVIDER,
    TOKEN_INTERCEPTOR_PROVIDER
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() coreModule?: CoreModule) {
    if (coreModule !== undefined && isDevMode()) {
      throwError('Double import of CoreModule');
    }
  }
}
