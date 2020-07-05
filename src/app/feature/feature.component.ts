import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-feature',
  template: `
    <app-base>
      <router-outlet></router-outlet>
    </app-base>`
})
export class FeatureComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

}
