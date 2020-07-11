import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../@core/authentication.service';
import {ToastrService} from 'ngx-toastr';
import {MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  spinner = false;
  passwordHide = true;
  tokenSectionIsActive = false;

  forgotPasswordFormGroup: FormGroup;

  constructor(private authService: AuthenticationService,
              private toastr: ToastrService,
              private formBuilder: FormBuilder,
              private dialogRef: MatDialogRef<ForgotPasswordComponent>) {
  }

  get emailValue() {
    return this.forgotPasswordFormGroup.get('email').value;
  }

  ngOnInit(): void {
    this.forgotPasswordFormGroup = this.formBuilder.group({
      email: [undefined, Validators.required],
      passResetToken: [undefined, Validators.required],
      password: [undefined, Validators.required]
    });
  }

  requestPassword() {
    this.spinner = true;
    this.authService.forgotPasswordSendEmail(this.emailValue).subscribe((res) => {
      this.toastr.success('Successful!', `An email has been successfully sent to '${this.emailValue}'`);
      this.spinner = false;
      this.tokenSectionIsActive = true;
    }, error => {
      this.toastr.error('Failed!', `The email '${this.emailValue}' appears to be invalid`);
      console.log(error);
      this.spinner = false;
    });
  }

  verifyToken() {
    this.spinner = true;
    this.authService.resetPassword(this.forgotPasswordFormGroup.value).subscribe(res => {
      this.toastr.success('Successful!', `Password reset successful for '${this.emailValue}'`);
      this.dialogRef.close();
    }, error => {
      this.toastr.error('Failed!', `Failed to reset password for '${this.emailValue}'`);
      console.log(error);
      this.spinner = false;
    });
  }
}
