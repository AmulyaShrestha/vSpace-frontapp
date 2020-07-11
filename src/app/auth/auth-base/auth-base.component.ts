import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RegisterComponent} from '../register/register.component';
import {MatBottomSheet} from '@angular/material/bottom-sheet';
import {AuthenticationService} from '../../@core/authentication.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {MatDialog} from '@angular/material/dialog';
import {ForgotPasswordComponent} from '../forgot-password/forgot-password.component';

@Component({
  selector: 'app-auth-base',
  templateUrl: './auth-base.component.html',
  styleUrls: ['./auth-base.component.scss']
})
export class AuthBaseComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private matBottomSheet: MatBottomSheet,
              private authService: AuthenticationService,
              private router: Router,
              private dialog: MatDialog,
              private toastr: ToastrService) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.loginForm = this.formBuilder.group({
      email: [undefined, Validators.required],
      password: [undefined, Validators.required]
    });
  }

  openRegisterForm(): void {
    this.matBottomSheet.open(RegisterComponent, {
      panelClass: 'fixed-bottom-sheet-width'
    });
  }

  openForgotPasswordModal() {
    const dialogRef = this.dialog.open(ForgotPasswordComponent, {
    });
  }

  onSubmit() {
    this.authService.userLogin(this.loginForm.value).subscribe(res => {
      localStorage.setItem('userId', res.user._id);
      localStorage.setItem('token', res.token);
      localStorage.setItem(res.user._id, res.user.dashboard);
      this.toastr.success('Successful!', `Welcome ${res.user.fullName}`);
      this.router.navigate(['detail']);
    }, error => {
      this.toastr.error('Failed!', 'Either email or password is incorrect!');
      console.log(error);
    });
  }
}
