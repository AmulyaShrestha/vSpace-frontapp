import { Component, OnInit } from '@angular/core';
import {NavService} from '../../service/nav.service';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html'
})
export class TopNavComponent implements OnInit {

  constructor(public navService: NavService) { }

  ngOnInit(): void {
  }

}
