import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthBaseComponent} from './auth-base/auth-base.component';
import {AuthGuardService as AuthGuard} from './guards/auth-guard.service';

const routes: Routes = [
  {path: '', component: AuthBaseComponent, canActivate: [AuthGuard]},
  {path: '**', redirectTo: '', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
