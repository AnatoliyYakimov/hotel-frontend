import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminComponent} from './admin.component';
import {FormsModule} from '@angular/forms';
import {MatCardModule} from '@angular/material/card/';
import {MatFormFieldModule} from '@angular/material/form-field/';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {RouterModule, Routes} from '@angular/router';
import {MatToolbarModule} from '@angular/material/toolbar';


const routes: Routes = [
  {
    path: '',
    component: AdminComponent
  }
];

@NgModule({
  declarations: [
    AdminComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterModule.forChild(routes),
    MatToolbarModule
  ]
})
export class AdminModule {
}
