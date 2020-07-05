import {NgModule} from '@angular/core';
import {AuthRoutingModule} from './auth-routing.module';
import {AuthBaseComponent} from './auth-base/auth-base.component';
import {CoreModule} from '../@core/core.module';
import {ThemeModule} from '../@theme/theme.module';
import {RegisterComponent} from './register/register.component';
import { RegisterClientComponent } from './register/register-client/register-client.component';

@NgModule({
  declarations: [AuthBaseComponent, RegisterComponent, RegisterClientComponent],
  imports: [
    CoreModule,
    ThemeModule,
    AuthRoutingModule
  ],
  entryComponents: [
    RegisterComponent
  ]
})
export class AuthModule {
}
