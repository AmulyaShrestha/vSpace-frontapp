import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthBaseComponent} from './auth-base/auth-base.component';


const routes: Routes = [
  {path: '', component: AuthBaseComponent},
  {path: '**', redirectTo: '', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
