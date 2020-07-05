import {ChangeDetectionStrategy, Component, EventEmitter, OnInit} from '@angular/core';
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
import {MatDialog} from '@angular/material/dialog';
import {AddNotesComponent} from '../add-notes/add-notes.component';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../../../@core/authentication.service';
import {User} from '../../../../auth/model/User';
import {ToastrService} from 'ngx-toastr';
import {keyframes} from '@angular/animations';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
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
    }
  };
  private resizeEvent: EventEmitter<any> = new EventEmitter<any>();
  private configureEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

  activeUserId;
  isStickyNoteMode = false;

  constructor(private dashboardService: DashboardService,
              public navService: NavService,
              public dialog: MatDialog,
              private router: Router,
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

  public addCalendar(): void {
    this.dashboard.push({
      id: '1',
      name: 'Calendar',
      componentName: 'google-calendar',
      componentType: NepaliCalendarComponent,
      cols: 2,
      rows: 2,
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
      cols: 2,
      rows: 1,
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
      cols: 2,
      rows: 2,
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
      cols: 2,
      rows: 2,
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
      cols: 2,
      rows: 2,
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
      cols: 2,
      rows: 2,
      y: 0,
      x: 0,
    });
  }

  openAddNoteModal() {
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
  }

  public addStickyNote(): void {
    this.dashboard.push({
      id: '7',
      name: 'Note',
      componentName: 'sticky-notes',
      componentType: StickyNoteComponent,
      cols: 2,
      rows: 2,
      y: 0,
      x: 0,
      title: 'asd',
      content: 'noteObject.content'
    });
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

  logOut() {
    localStorage.clear();
    this.router.navigate(['auth']);
  }
}
