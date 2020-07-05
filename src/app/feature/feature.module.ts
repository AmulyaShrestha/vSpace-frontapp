import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FeatureRoutingModule} from './feature-routing.module';
import {FeatureComponent} from './feature.component';
import {ThemeModule} from '../@theme/theme.module';

@NgModule({
  declarations: [FeatureComponent],
  imports: [
    CommonModule,
    ThemeModule,
    FeatureRoutingModule
  ]
})
export class FeatureModule {
}
