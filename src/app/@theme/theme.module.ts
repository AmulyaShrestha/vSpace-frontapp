import {NgModule} from '@angular/core';
import {FlexLayoutModule} from '@angular/flex-layout';
import {BaseComponent} from './layout/base/base.component';
import {TopNavComponent} from './layout/top-nav/top-nav.component';
import {MenuListItemComponent} from './layout/menu-list-item/menu-list-item.component';
import {CommonModule} from '@angular/common';
import {MatStepperModule} from '@angular/material/stepper';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSliderModule} from '@angular/material/slider';
import {MatRadioModule} from '@angular/material/radio';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatSelectModule} from '@angular/material/select';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatButtonModule} from '@angular/material/button';
import {MatTabsModule} from '@angular/material/tabs';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatNativeDateModule} from '@angular/material/core';
import {MatMenuModule} from '@angular/material/menu';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatDialogModule} from '@angular/material/dialog';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatTooltipModule} from '@angular/material/tooltip';
import { GhostAnimationComponent } from './designs/ghost-animation/ghost-animation.component';
import {AgmCoreModule} from '@agm/core';
import {ColorPickerModule} from 'ngx-color-picker';

const MAT_MODULES = [
  MatStepperModule,
  MatFormFieldModule,
  MatInputModule,
  MatSliderModule,
  MatRadioModule,
  MatAutocompleteModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatSelectModule,
  MatSlideToggleModule,
  MatButtonModule,
  MatTabsModule,
  MatCardModule,
  MatProgressSpinnerModule,
  MatIconModule,
  MatToolbarModule,
  MatSidenavModule,
  MatListModule,
  MatNativeDateModule,
  MatMenuModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatSnackBarModule,
  MatDialogModule,
  MatTooltipModule,
  MatBottomSheetModule
];

const ADDITIONAL_MODULES = [
  AgmCoreModule,
  FlexLayoutModule,
  ColorPickerModule
];

const COMPONENTS = [
  BaseComponent,
  TopNavComponent,
  MenuListItemComponent,
  GhostAnimationComponent
];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    CommonModule,
    ...MAT_MODULES,
    ...ADDITIONAL_MODULES
  ],
  exports: [
    ...MAT_MODULES,
    ...ADDITIONAL_MODULES,
    ...COMPONENTS
  ]
})
export class ThemeModule {
}
