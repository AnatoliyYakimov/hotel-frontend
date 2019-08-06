import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RoomsListComponent} from './rooms-list/rooms-list.component';
import {RoomDetailsComponent} from './room-details/room-details.component';
import {MatDividerModule} from '@angular/material/divider';
import {RoomFilterFromComponent} from './room-filter-from/room-filter-from.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {ReactiveFormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {Ng5SliderModule} from 'ng5-slider';
import {SharedModule} from '../../_shared/shared.module';
import {MatButtonModule, MatCheckboxModule} from '@angular/material';


@NgModule({
  declarations: [
    RoomsListComponent,
    RoomDetailsComponent,
    RoomFilterFromComponent
  ],
  imports: [
    CommonModule,
    MatDividerModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule,
    Ng5SliderModule,
    SharedModule,
    MatCheckboxModule,
    MatButtonModule
  ],
  exports: [
    RoomsListComponent,
    RoomDetailsComponent,
    RoomFilterFromComponent
  ]
})
export class RoomsModule {
}
