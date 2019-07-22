import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  MatButtonModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatMenuModule, MatRadioModule,
  MatSelectModule
} from '@angular/material';
import {MatToolbarModule} from '@angular/material';
import {HeaderComponent} from './header/header.component';
import {BodyComponent} from './body/body.component';
import {FooterComponent} from './footer/footer.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {RoomsComponent} from './rooms/rooms.component';
import {RoomsListComponent} from './rooms/rooms-list/rooms-list.component';
import {RoomDetailsComponent} from './rooms/room-details/room-details.component';
import {RoomsListPageComponent} from './rooms/pages/rooms-list-page/rooms-list-page.component';
import {RoomDetailsPageComponent} from './rooms/room-details-page/room-details-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BodyComponent,
    FooterComponent,
    RoomsComponent,
    RoomsListComponent,
    RoomDetailsComponent,
    RoomsListPageComponent,
    RoomDetailsPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
