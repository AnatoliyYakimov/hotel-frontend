import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PermitDirective} from './directives/permit/permit.directive';


@NgModule({
  declarations: [
    PermitDirective
  ],
  exports: [
    PermitDirective
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule {
}
