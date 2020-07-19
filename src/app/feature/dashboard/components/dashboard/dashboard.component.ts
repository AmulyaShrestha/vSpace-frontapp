import {ChangeDetectionStrategy, Component, EventEmitter, OnInit, TemplateRef} from '@angular/core';
import {DashboardService} from '../../services/dashboard.service';
import {DisplayGrid, GridsterConfig, GridsterItem} from 'angular-gridster2';
import {NepaliCalendarComponent} from '../nepali-calendar/nepali-calendar.component';
import {CloclAnalogueComponent} from '../clock-analogue/clocl-analogue.component';
import {YoutubeComponent} from '../youtube/youtube.component';
import {CoronaWorldMapComponent} from '../corona-world-map/corona-world-map.component';
import {CoronaWorldTableComponent} from '../corona-world-table/corona-world-table.component';
import {WeatherComponent} from '../weather/weather.component';
import {NavService} from '../../../../@theme/service/nav.service';
import {StickyNoteComponent} from '../sticky-note/sticky-note.component';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../../../@core/authentication.service';
import {User} from '../../../../auth/model/User';
import {ToastrService} from 'ngx-toastr';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToDoComponent} from '../to-do/to-do.component';
// tslint:disable-next-line:max-line-length
import {NewYorkTimesNewsComponentComponent} from '../advanced-widgets/new-york-times-news-component/new-york-times-news-component.component';
import {animate, style, transition, trigger} from '@angular/animations';
import {MatDialog} from '@angular/material/dialog';
import {UpdateProfileModalComponent} from '../update-profile-modal/update-profile-modal.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: [
    trigger(
      'inOutAnimation',
      [
        transition(
          ':enter',
          [
            style({ height: 0, opacity: 0 }),
            animate('0.5s ease-out',
              style({ height: '*', opacity: 1 }))
          ]
        ),
        transition(
          ':leave',
          [
            style({ height: '*', opacity: 1 }),
            animate('0.5s ease-in',
              style({ height: 0, opacity: 0 }))
          ]
        )
      ]
    )
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit {
  public options: GridsterConfig;
  public dashboard: Array<GridsterItem>;
  public showConfig = false;
  public outputs = {
    valueChange: (emittedObject) => {
      this.dashboard[emittedObject.activeWidgetIndex].title = emittedObject.noteObject.title;
      this.dashboard[emittedObject.activeWidgetIndex].content = emittedObject.noteObject.content;
    },
    toDoValueChange: (emittedObject) => {
      this.dashboard[emittedObject.activeWidgetIndexForToDo].toDoTitle = emittedObject.toDoObject.title;
      this.dashboard[emittedObject.activeWidgetIndexForToDo].toDoList = emittedObject.toDoObject.toDoList;
    }
  };
  private resizeEvent: EventEmitter<any> = new EventEmitter<any>();
  private configureEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

  activeUserId;
  activeUser: User = new User();
  isStickyNoteMode = false;
  stickyNoteModalOpened = false;
  stickyNoteForm: FormGroup;
  toDoForm: FormGroup;

  constructor(private dashboardService: DashboardService,
              public navService: NavService,
              private formBuilder: FormBuilder,
              private router: Router,
              private dialog: MatDialog,
              private authService: AuthenticationService,
              private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.dashboardService.loadDashBoards();

    this.options = this.dashboardService.getDashBoardOptions();
    this.options.displayGrid = DisplayGrid.OnDragAndResize;
    this.options.itemChangeCallback = (item) => {
      // update DB with new size
      // send the update to widgets
      this.resizeEvent.emit(item);
    };
    this.options.itemResizeCallback = (item) => {
      // update DB with new size
      // send the update to widgets
      this.resizeEvent.emit(item);
    };

    this.activeUserId = localStorage.getItem('userId');
    if (this.activeUserId !== 'default') {
      this.authService.getActiveUser().subscribe((res: User) => {
        this.activeUser = res;
      });
    }
    this.dashboard = this.dashboardService.getUserDashBoards(this.activeUserId)[0].widgets;
  }

  changedOptions() {
    this.options.api.optionsChanged();
  }

  public onClick_removeItem($event, item): void {
    $event.preventDefault();
    $event.stopPropagation();
    if (confirm('Are you sure you want delete this component?')) {
      this.dashboard.splice(this.dashboard.indexOf(item), 1);
    }
  }

  onClick_configureItem($event, item): void {
    $event.preventDefault();
    $event.stopPropagation();
    this.showConfig = !this.showConfig;
    this.configureEvent.emit(this.showConfig);
  }

  public onSelectHomeDashboard(): void {
    this.isStickyNoteMode = false;
    this.dashboard = this.dashboardService.getUserDashBoards(this.activeUserId)[0].widgets;
  }

  public onSelectStickyNotes(): void {
    this.isStickyNoteMode = true;
    this.dashboard = this.dashboardService.getUserDashBoards(this.activeUserId)[1].widgets;
  }

  buildStickyNoteAndToDoForm() {
    this.stickyNoteForm = this.formBuilder.group({
      title: [undefined, Validators.required],
      content: [undefined, Validators.required]
    });
    this.toDoForm = this.formBuilder.group({
      title: [undefined, Validators.required],
      toDoList: this.formBuilder.array([], Validators.required),
    });
  }

  public addCalendar(): void {
    this.dashboard.push({
      id: '1',
      name: 'Calendar',
      componentName: 'google-calendar',
      componentType: NepaliCalendarComponent,
      cols: 5,
      rows: 5,
      y: 0,
      x: 0,
    });
  }

  public addAnalogue(): void {
    this.dashboard.push({
      id: '2',
      name: 'Clock',
      componentName: 'clock-analogue',
      componentType: CloclAnalogueComponent,
      cols: 5,
      rows: 5,
      y: 0,
      x: 0,
    });
  }

  public addYouTube(): void {
    this.dashboard.push({
      id: '3',
      name: 'YouTube',
      componentName: 'youtube',
      componentType: YoutubeComponent,
      cols: 5,
      rows: 5,
      y: 0,
      x: 0,
    });
  }

  public addCoronaWorldMap(): void {
    this.dashboard.push({
      id: '4',
      name: 'Corona World Statistics',
      componentName: 'corona-world-map',
      componentType: CoronaWorldMapComponent,
      cols: 5,
      rows: 5,
      y: 0,
      x: 0,
    });
  }

  public addCoronaTable(): void {
    this.dashboard.push({
      id: '5',
      name: 'Corona World Statistics',
      componentName: 'corona-world-table',
      componentType: CoronaWorldTableComponent,
      cols: 5,
      rows: 5,
      y: 0,
      x: 0,
    });
  }

  public addWeather(): void {
    this.dashboard.push({
      id: '6',
      name: 'Weather',
      componentName: 'weather',
      componentType: WeatherComponent,
      cols: 5,
      rows: 5,
      y: 0,
      x: 0,
    });
  }

  public addArtNews(): void {
    this.dashboard.push({
      id: '7',
      name: 'Art News',
      componentName: 'art-news',
      componentType: NewYorkTimesNewsComponentComponent,
      cols: 5,
      rows: 5,
      y: 0,
      x: 0,
    });
  }

  public addScienceNews(): void {
    this.dashboard.push({
      id: '8',
      name: 'Science News',
      componentName: 'science-news',
      componentType: NewYorkTimesNewsComponentComponent,
      cols: 10,
      rows: 7,
      y: 0,
      x: 0,
    });
  }

  public addTopNews(): void {
    this.dashboard.push({
      id: '9',
      name: 'Top 10 News',
      componentName: 'top-news',
      componentType: NewYorkTimesNewsComponentComponent,
      cols: 5,
      rows: 5,
      y: 0,
      x: 0,
    });
  }

  public addWorldNews(): void {
    this.dashboard.push({
      id: '9',
      name: 'World News',
      componentName: 'world-news',
      componentType: NewYorkTimesNewsComponentComponent,
      cols: 5,
      rows: 5,
      y: 0,
      x: 0,
    });
  }

  /*openAddNoteModal() {
    const dialogRef = this.dialog.open(AddNotesComponent);
    dialogRef.afterClosed().subscribe(data => {
      this.dashboard.push({
        id: '7',
        name: 'Note',
        componentName: 'sticky-notes',
        componentType: StickyNoteComponent,
        cols: 2,
        rows: 2,
        y: 0,
        x: 0,
        title: data.title,
        content: data.content
      });
    });
  }*/

  public addStickyNote(): void {
    if (this.stickyNoteForm.valid) {
      this.dashboard.push({
        id: '7',
        name: 'Note',
        componentName: 'sticky-notes',
        componentType: StickyNoteComponent,
        cols: 2,
        rows: 2,
        y: 0,
        x: 0,
        title: this.stickyNoteForm.get('title').value,
        content: this.stickyNoteForm.get('content').value
      });
      this.stickyNoteModalOpened = false;
      this.stickyNoteForm = undefined;
    }
  }

  public addToDoList(): void {
    if (this.toDoForm.valid) {
      this.dashboard.push({
        id: '8',
        name: 'To-Dos',
        componentName: 'toDo',
        componentType: ToDoComponent,
        cols: 2,
        rows: 2,
        y: 0,
        x: 0,
        toDoTitle: this.toDoForm.get('title').value,
        toDoList: JSON.stringify(this.toDoForm.get('toDoList').value)
      });
      this.stickyNoteModalOpened = false;
      this.stickyNoteForm = undefined;
    }
  }

  openUpdatedStickyModal() {
    this.buildStickyNoteAndToDoForm();
    this.stickyNoteModalOpened = true;
  }

  closeStickyNoteModal(elementRef) {
    console.log('Dynamic height of the modal', elementRef.offsetHeight);
    this.stickyNoteModalOpened = false;
    this.stickyNoteForm = undefined;
  }

  addFieldForToDo(toDoContent) {
    const control = this.toDoForm.controls.toDoList as FormArray;
    control.push(
      this.formBuilder.group({
        toDoContent: [toDoContent.value, Validators.required],
        checked: false
      })
    );
    toDoContent.value = '';
  }

  removeToDoField(index) {
    (this.toDoForm.get('toDoList') as FormArray).removeAt(index);
  }

  public onClick_SaveUserDashboardsToLocalStorage(): void {
    this.dashboardService.saveUserDashBoards(this.activeUserId);
    if (localStorage.getItem('userId') === 'default'){
     this.toastr.success('Saved successfully!');
     return;
    }
    this.authService.getActiveUser().subscribe((res: User) => {
      res.dashboard = JSON.stringify(this.dashboardService.userDashboards.get(this.activeUserId));
      this.authService.userUpdate(res).subscribe(() => {
        this.toastr.success('Saved successfully!');
      }, error => {
        this.toastr.error('Failed');
      });
    }, error => {
      this.toastr.error('Failed');
    });
  }

  openUpdateProfileModal() {
    const dialogRef = this.dialog.open(UpdateProfileModalComponent, {
      data: this.activeUser
    });
  }

  logOut() {
    localStorage.clear();
    this.router.navigate(['auth']);
  }
}
