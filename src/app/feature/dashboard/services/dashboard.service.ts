import {Injectable} from '@angular/core';
import {Dashboard, DashboardOptions, Widget} from '../models';
import {CompactType, GridType} from 'angular-gridster2';
import {NepaliCalendarComponent} from '../components/nepali-calendar/nepali-calendar.component';
import {CloclAnalogueComponent} from '../components/clock-analogue/clocl-analogue.component';
import {YoutubeComponent} from '../components/youtube/youtube.component';
import {CoronaWorldMapComponent} from '../components/corona-world-map/corona-world-map.component';
import {CoronaWorldTableComponent} from '../components/corona-world-table/corona-world-table.component';
import {WeatherComponent} from '../components/weather/weather.component';
import {User} from '../../../auth/model/User';
import {StickyNoteComponent} from '../components/sticky-note/sticky-note.component';
import {ToDoComponent} from '../components/to-do/to-do.component';

interface IDashboardService {
  getUserDashBoards(user: User): Array<Dashboard>;

  saveUserDashBoards(user: User): void;

  getDashBoardOptions(): DashboardOptions;
}

@Injectable()
export class DashboardService implements IDashboardService {
  public userDashboards: Map<string, Array<Dashboard>> = new Map<string, Array<Dashboard>>();

  constructor() {}

  public getUserDashBoards(userId): Array<Dashboard> {
    return this.userDashboards.get(userId);
  }

  public saveUserDashBoards(userId): void {
    localStorage.setItem(userId, JSON.stringify(this.userDashboards.get(userId)));
    console.log(this.userDashboards);
  }

  public getDashBoardOptions(): DashboardOptions {
    return {
      gridType: GridType.ScrollVertical,
      compactType: CompactType.None,
      margin: 10,
      outerMargin: true,
      outerMarginTop: null,
      outerMarginRight: null,
      outerMarginBottom: null,
      outerMarginLeft: null,
      mobileBreakpoint: 640,
      minCols: 20,
      maxCols: 20,
      minRows: 10,
      maxRows: 100,
      maxItemCols: 100,
      minItemCols: 1,
      maxItemRows: 100,
      minItemRows: 1,
      maxItemArea: 1000,
      minItemArea: 1,
      defaultItemCols: 1,
      defaultItemRows: 1,
      fixedColWidth: 105,
      fixedRowHeight: 105,
      keepFixedHeightInMobile: false,
      keepFixedWidthInMobile: false,
      scrollSensitivity: 10,
      scrollSpeed: 20,
      enableEmptyCellClick: false,
      enableEmptyCellContextMenu: false,
      enableEmptyCellDrop: false,
      enableEmptyCellDrag: false,
      emptyCellDragMaxCols: 50,
      emptyCellDragMaxRows: 50,
      ignoreMarginInRow: false,
      draggable: {
        delayStart: 0,
        enabled: true,
        ignoreContentClass: 'gridster-item-content',
        ignoreContent: true,
        dragHandleClass: 'drag-handler',
        dropOverItems: false
      },
      resizable: {
        enabled: true,
      },
      swap: false,
      pushItems: true,
      disablePushOnDrag: false,
      disablePushOnResize: false,
      pushDirections: {north: true, east: true, south: true, west: true},
      pushResizeItems: false,
      displayGrid() {
      },
      disableWindowResize: false,
      disableWarnings: false,
      scrollToNewItems: false,
      itemChangeCallback() {
      },
      itemResizeCallback() {
      }
    };
  }

  private setDashboardById(activeUserId) {
    const savedDashboards = localStorage.getItem(activeUserId);
    const dashboards = JSON.parse(savedDashboards) as Array<Dashboard>;
    dashboards.forEach((dashboard: Dashboard) => {
      dashboard.widgets.forEach((widget: Widget) => {
        if (widget.componentName === 'google-calendar') {
          widget.componentType = NepaliCalendarComponent;
        }
        if (widget.componentName === 'clock-analogue') {
          widget.componentType = CloclAnalogueComponent;
        }
        if (widget.componentName === 'youtube') {
          widget.componentType = YoutubeComponent;
        }
        if (widget.componentName === 'corona-world-map') {
          widget.componentType = CoronaWorldMapComponent;
        }
        if (widget.componentName === 'corona-world-table') {
          widget.componentType = CoronaWorldTableComponent;
        }
        if (widget.componentName === 'weather') {
          widget.componentType = WeatherComponent;
        }
        if (widget.componentName === 'sticky-notes') {
          widget.componentType = StickyNoteComponent;
        }
        if (widget.componentName === 'toDo') {
          widget.componentType = ToDoComponent;
        }
        if (widget.componentName === 'art-news') {
          widget.componentType = ToDoComponent;
        }
        if (widget.componentName === 'science-news') {
          widget.componentType = ToDoComponent;
        }
        if (widget.componentName === 'world-news') {
          widget.componentType = ToDoComponent;
        }
        if (widget.componentName === 'top-news') {
          widget.componentType = ToDoComponent;
        }
      });
    });
    this.userDashboards.set(activeUserId, dashboards);
  }

  public loadDashBoards(): void {
    const activeUserId = localStorage.getItem('userId');
    if (activeUserId && activeUserId !== 'default') {
      this.setDashboardById(activeUserId);
    } else if (activeUserId === 'default') {
      this.setDashboardById('default');
    } else {
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
      this.userDashboards.set('default', dashBoards);
      localStorage.setItem('userId', 'default');
      localStorage.setItem('default', JSON.stringify(dashBoards));
    }
  }
}

