import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../../../@core/authentication.service';
import {ToastrService} from 'ngx-toastr';
import {Dashboard} from '../../../feature/dashboard/models';
import {CoronaWorldTableComponent} from '../../../feature/dashboard/components/simple-widgets/corona-world-table/corona-world-table.component';
import {WeatherComponent} from '../../../feature/dashboard/components/simple-widgets/weather/weather.component';
import {CoronaWorldMapComponent} from '../../../feature/dashboard/components/simple-widgets/corona-world-map/corona-world-map.component';
import {NepaliCalendarComponent} from '../../../feature/dashboard/components/simple-widgets/nepali-calendar/nepali-calendar.component';
import {YoutubeComponent} from '../../../feature/dashboard/components/simple-widgets/youtube/youtube.component';
import {CloclAnalogueComponent} from '../../../feature/dashboard/components/simple-widgets/clock-analogue/clocl-analogue.component';
import {Router} from '@angular/router';
import {MatBottomSheetRef} from '@angular/material/bottom-sheet';
import {StickyNoteComponent} from '../../../feature/dashboard/components/sticky-note/sticky-note.component';
import {ToDoComponent} from '../../../feature/dashboard/components/to-do/to-do.component';

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
      const newUser = res.user;
      this.toastr.success('Successful!', 'User successfully registered');
      localStorage.setItem('userId', res.user._id);
      localStorage.setItem('token', res.token);

      // Setting dashboard--
      const dashBoards = new Array<Dashboard>();
      dashBoards.push({
        id: '1', name: 'Home', user: undefined, widgets: [
          {
            cols: 9,
            componentName: 'corona-world-table',
            componentType: CoronaWorldTableComponent,
            id: '5',
            name: 'Corona World Statistics',
            rows: 7,
            x: 5,
            y: 7
          },
          {
            cols: 4,
            componentName: 'weather',
            componentType: WeatherComponent,
            id: '6',
            name: 'Weather',
            rows: 7,
            x: 16,
            y: 0
          },
          {
            cols: 16,
            componentName: 'corona-world-map',
            componentType: CoronaWorldMapComponent,
            id: '4',
            name: 'Corona World Statistics',
            rows: 7,
            x: 0,
            y: 0
          },
          {
            cols: 5,
            componentName: 'google-calendar',
            componentType: NepaliCalendarComponent,
            id: '1',
            name: 'Calendar',
            rows: 7,
            x: 0,
            y: 7
          },
          {
            cols: 6,
            componentName: 'youtube',
            componentType: YoutubeComponent,
            id: '3',
            name: 'YouTube',
            rows: 7,
            x: 14,
            y: 7
          },
          {
            cols: 8,
            componentName: 'clock-analogue',
            componentType: CloclAnalogueComponent,
            id: '2',
            name: 'Clock',
            rows: 8,
            x: 0,
            y: 14
          }]
      });
      dashBoards.push({
        id: '1', name: 'Home', user: undefined, widgets: [
          {
            cols: 5,
            componentName: 'sticky-notes',
            componentType: StickyNoteComponent,
            id: '5',
            name: 'Notes',
            rows: 4,
            x: 0,
            y: 0,
          },
          {
            cols: 4,
            componentName: 'sticky-notes',
            componentType: StickyNoteComponent,
            content: 'The content 3',
            id: '7',
            name: 'Note',
            rows: 4,
            title: 'The title 3',
            x: 16,
            y: 4
          },
          {
            cols: 3,
            componentName: 'sticky-notes',
            componentType: StickyNoteComponent,
            content: '2',
            id: '7',
            name: 'Note',
            rows: 5,
            title: '2',
            x: 3,
            y: 4
          },
          {
            cols: 3,
            componentName: 'sticky-notes',
            componentType: StickyNoteComponent,
            content: '4',
            id: '7',
            name: 'Note',
            rows: 3,
            title: '4',
            x: 11,
            y: 4
          },
          {
            cols: 4,
            componentName: 'sticky-notes',
            componentType: StickyNoteComponent,
            content: '5',
            id: '7',
            name: 'Note',
            rows: 5,
            title: '5',
            x: 6,
            y: 1
          },
          {
            cols: 6,
            componentName: 'toDo',
            componentType: ToDoComponent,
            toDoList: '[{"toDoContent":"You first task goes here","checked":false},{"toDoContent":"The second one being here and...","checked":false},{"toDoContent":"The third one belongs to this place","checked":false}]',
            id: '8',
            name: 'To-Dos',
            rows: 4,
            toDoTitle: 'Some set of tasks to do',
            x: 13,
            y: 0
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
