import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

const BASE_MODULES = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule
];

@NgModule({
  declarations: [],
  imports: [
    ...BASE_MODULES
  ],
  exports: [
    ...BASE_MODULES
  ]
})
export class CoreModule { }
