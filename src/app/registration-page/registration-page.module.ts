import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RegistrationPageComponent} from './registration-page.component';
import {FormsModule} from '@angular/forms';
import {MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule} from '@angular/material';

import {MatDatepickerModule} from '@angular/material/datepicker';

@NgModule({
  declarations: [
    RegistrationPageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatButtonModule,
    MatCardModule
  ]
})
export class RegistrationPageModule {
}
