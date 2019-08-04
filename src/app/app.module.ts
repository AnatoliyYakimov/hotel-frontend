import {BrowserModule} from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {INTERCEPTOR_PROVIDER} from './_interceptors/interceptors-provider';
import {CoreModule} from './core/core.module';
import {SharedModule} from './_shared/shared.module';
import {HttpClientModule} from '@angular/common/http';
import {MatMomentDateModule} from '@angular/material-moment-adapter';
import {LoginPageModule} from './login-page/login-page.module';
import {MatCardModule, MatDatepickerModule, MatFormFieldModule, MatInputModule} from '@angular/material';
import {FormsModule} from '@angular/forms';
import {RegistrationPageModule} from './registration-page/registration-page.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    SharedModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatMomentDateModule,
    LoginPageModule,
    MatFormFieldModule,
    MatCardModule,
    FormsModule,
    MatDatepickerModule,
    MatInputModule,
    RegistrationPageModule,
  ],
  providers: [
    ...INTERCEPTOR_PROVIDER,
    {provide: LOCALE_ID, useValue: 'ru-RU'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
