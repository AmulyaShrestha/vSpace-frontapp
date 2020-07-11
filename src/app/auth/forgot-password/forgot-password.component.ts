import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../@core/authentication.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  spinner = false;

  constructor(private authService: AuthenticationService,
              private toastr: ToastrService) {
  }

  ngOnInit(): void {
  }

  requestPassword(email) {
    this.spinner = true;
    this.authService.forgotPasswordSendEmail(email).subscribe((res) => {
      this.toastr.success('Successful!', `An email has been successfully sent to '${email}'`);
      console.log(res);
      this.spinner = false;
      }, error => {
      this.toastr.success('Failed!', `The email '${email}' appears to be invalid`);
      console.log(error);
    });
  }
}
