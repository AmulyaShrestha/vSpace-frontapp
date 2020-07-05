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
      minCols: 1,
      maxCols: 100,
      minRows: 1,
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
      this.userDashboards.set('default', dashBoards);
      localStorage.setItem('userId', 'default');
    }
  }
}

