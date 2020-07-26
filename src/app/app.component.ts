import { Component } from '@angular/core';
import {ColorSchemeService} from './@theme/service/color-scheme.service';

@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`
})
export class AppComponent {
  constructor(private colorSchemeService: ColorSchemeService) {
    this.colorSchemeService.load();
  }
}
