import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../../../@core/authentication.service';
import {ToastrService} from 'ngx-toastr';
import {Dashboard} from '../../../feature/dashboard/models';
import {CoronaWorldTableComponent} from '../../../feature/dashboard/components/corona-world-table/corona-world-table.component';
import {WeatherComponent} from '../../../feature/dashboard/components/weather/weather.component';
import {CoronaWorldMapComponent} from '../../../feature/dashboard/components/corona-world-map/corona-world-map.component';
import {NepaliCalendarComponent} from '../../../feature/dashboard/components/nepali-calendar/nepali-calendar.component';
import {YoutubeComponent} from '../../../feature/dashboard/components/youtube/youtube.component';
import {CloclAnalogueComponent} from '../../../feature/dashboard/components/clock-analogue/clocl-analogue.component';
import {Router} from '@angular/router';
import {MatBottomSheetRef} from '@angular/material/bottom-sheet';
import {StickyNoteComponent} from '../../../feature/dashboard/components/sticky-note/sticky-note.component';
import {User} from '../../model/User';

@Component({
  selector: 'app-register-client',
  templateUrl: './register-client.component.html',
  styleUrls: ['./register-client.component.scss']
})
export class RegisterClientComponent implements OnInit {
  registerForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthenticationService,
              private toastr: ToastrService,
              private router: Router,
              private activeModal: MatBottomSheetRef<RegisterClientComponent>) {
  }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.registerForm = this.formBuilder.group({
      username: [undefined, Validators.required],
      fullName: [undefined, Validators.required],
      age: [undefined, Validators.required],
      email: [undefined, Validators.required],
      password: [undefined, Validators.required],
      dashboard: [undefined],
    });
  }

  onSubmit() {
    this.authService.save(this.registerForm.value).subscribe(res => {
      console.log(res);
      let newUser = new User();
      newUser = res.user;
      this.toastr.success('Successful!', 'User successfully registered');
      localStorage.setItem('userId', res.user._id);
      localStorage.setItem('token', res.token);

      // Setting dashboard--
      const dashBoards = new Array<Dashboard>();
      dashBoards.push({
        id: '1', name: 'Home', user: undefined, widgets: [
          {
            cols: 6,
            componentName: 'corona-world-table',
            componentType: CoronaWorldTableComponent,
            id: '5',
            name: 'Corona World Statistics',
            rows: 4,
            x: 3,
            y: 4
          },
          {
            cols: 3,
            componentName: 'weather',
            componentType: WeatherComponent,
            id: '6',
            name: 'Weather',
            rows: 5,
            x: 9,
            y: 0
          },
          {
            cols: 9,
            componentName: 'corona-world-map',
            componentType: CoronaWorldMapComponent,
            id: '4',
            name: 'Corona World Statistics',
            rows: 4,
            x: 0,
            y: 0
          },
          {
            cols: 3,
            componentName: 'google-calendar',
            componentType: NepaliCalendarComponent,
            id: '1',
            name: 'Calendar',
            rows: 4,
            x: 0,
            y: 4
          },
          {
            cols: 3,
            componentName: 'youtube',
            componentType: YoutubeComponent,
            id: '3',
            name: 'YouTube',
            rows: 3,
            x: 9,
            y: 5
          },
          {
            cols: 5,
            componentName: 'clock-analogue',
            componentType: CloclAnalogueComponent,
            id: '2',
            name: 'Clock',
            rows: 4,
            x: 0,
            y: 8
          }]
      });
      dashBoards.push({
        id: '1', name: 'Home', user: undefined, widgets: [
          {
            cols: 3,
            componentName: 'sticky-notes',
            componentType: StickyNoteComponent,
            id: '5',
            name: 'Notes',
            rows: 3,
            x: 0,
            y: 0,
          },
          {
            cols: 2,
            componentName: 'sticky-notes',
            componentType: StickyNoteComponent,
            content: 'The content 3',
            id: '7',
            name: 'Note',
            rows: 2,
            title: 'The title 3',
            x: 7,
            y: 0
          },
          {
            cols: 2,
            componentName: 'sticky-notes',
            componentType: StickyNoteComponent,
            content: '2',
            id: '7',
            name: 'Note',
            rows: 2,
            title: '2',
            x: 3,
            y: 2
          },
          {
            cols: 2,
            componentName: 'sticky-notes',
            componentType: StickyNoteComponent,
            content: '4',
            id: '7',
            name: 'Note',
            rows: 2,
            title: '4',
            x: 9,
            y: 2
          },
          {
            cols: 2,
            componentName: 'sticky-notes',
            componentType: StickyNoteComponent,
            content: '5',
            id: '7',
            name: 'Note',
            rows: 2,
            title: '5',
            x: 5,
            y: 1
          }]
      });
      localStorage.setItem(res.user._id, JSON.stringify(dashBoards));
      newUser.dashboard = JSON.stringify(dashBoards);

      this.authService.userUpdate(newUser).subscribe((updatedRes) => {
        this.activeModal.dismiss();
        this.router.navigate(['detail/dashboard']);
      }, error => {
        console.log(error);
      });
    }, err => {
      if (err.error.keyPattern) {
        const errorArray = Object.keys(err.error.keyPattern);
        this.toastr.error('Unsuccessful!!', `Invalid ${errorArray[0]}`);
      } else if (err.error.message) {
        this.toastr.error('Unsuccessful!!', err.error.message);
      } else {
        this.toastr.error('Unsuccessful!!', 'User could not be registered');
      }
    });
  }
}
