import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  userExists: boolean;
  wantsToRemember: boolean;

  constructor(public router: Router) { }

  protected hasRemembered(): boolean {
    this.userExists = !!localStorage.getItem('token');
    this.wantsToRemember = localStorage.getItem('rememberStatus') === 'true';
    return this.userExists && this.wantsToRemember;
  }

  canActivate(): boolean {
    if (!this.hasRemembered()) {
      return true;
    }
    this.router.navigate(['/detail']);
    return false;
  }
}
