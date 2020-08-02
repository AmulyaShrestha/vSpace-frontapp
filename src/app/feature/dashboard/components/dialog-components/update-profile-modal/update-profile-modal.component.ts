import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../../../../../@core/authentication.service';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {User} from '../../../../../auth/model/User';

@Component({
  selector: 'app-update-profile-modal',
  templateUrl: './update-profile-modal.component.html',
  styleUrls: ['./update-profile-modal.component.scss']
})
export class UpdateProfileModalComponent implements OnInit {
  registerForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthenticationService,
              private toastr: ToastrService,
              private router: Router,
              private activeModal: MatDialogRef<UpdateProfileModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: User) {
  }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.registerForm = this.formBuilder.group({
      username: [this.data.username, Validators.required],
      fullName: [this.data.fullName, Validators.required],
      age: [this.data.age, Validators.required],
      email: [this.data.email, Validators.required]
    });
  }

  onSubmit() {
    this.data.username = this.registerForm.get('username').value;
    this.data.fullName = this.registerForm.get('fullName').value;
    this.data.age = this.registerForm.get('age').value;
    this.data.email = this.registerForm.get('email').value;
    this.authService.userUpdate(this.data).subscribe(res => {
      this.toastr.success('Successfully updated!');
      this.activeModal.close(this.data);
    }, error => {
      this.toastr.error('Failed to update profile!');
      console.log(error);
    });
  }
}
