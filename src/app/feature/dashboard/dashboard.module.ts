import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DashboardRoutingModule} from './dashboard-routing.module';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {ThemeModule} from '../../@theme/theme.module';
import {GridsterModule} from 'angular-gridster2';
import {DynamicModule} from 'ng-dynamic-component';
import {DashboardService} from './services/dashboard.service';
import {WidgetCommunicationService} from './services/widget-communication.service';
import {YoutubeComponent} from './components/simple-widgets/youtube/youtube.component';
import {CoronaWorldMapComponent} from './components/simple-widgets/corona-world-map/corona-world-map.component';
import {CoronaWorldTableComponent} from './components/simple-widgets/corona-world-table/corona-world-table.component';
import {CoronaMetricsComponent} from './components/simple-widgets/corona-metrics/corona-metrics.component';
import {CoronaWorldChartComponent} from './components/simple-widgets/corona-world-chart/corona-world-chart.component';
import {CloclAnalogueComponent} from './components/simple-widgets/clock-analogue/clocl-analogue.component';
import {NepaliCalendarComponent} from './components/simple-widgets/nepali-calendar/nepali-calendar.component';
import {WeatherComponent} from './components/simple-widgets/weather/weather.component';
import {StickyNoteComponent} from './components/sticky-note/sticky-note.component';
import {CoreModule} from '../../@core/core.module';
import { AddNotesComponent } from './components/dialog-components/add-notes/add-notes.component';
import { ToDoComponent } from './components/to-do/to-do.component';
import { NewYorkTimesNewsComponentComponent } from './components/advanced-widgets/new-york-times-news-component/new-york-times-news-component.component';
import { UpdateProfileModalComponent } from './components/dialog-components/update-profile-modal/update-profile-modal.component';
import { LocationViewerComponent } from './components/advanced-widgets/location-viewer/location-viewer.component';
import { AddLocationModalComponent } from './components/advanced-widgets/add-location-modal/add-location-modal.component';
import { WidgetSettingsDialogComponent } from './components/dialog-components/widget-settings-dialog/widget-settings-dialog.component';

@NgModule({
  declarations: [
    DashboardComponent,
    YoutubeComponent,
    CoronaWorldMapComponent,
    CoronaWorldTableComponent,
    CoronaMetricsComponent,
    CoronaWorldChartComponent,
    CloclAnalogueComponent,
    NepaliCalendarComponent,
    WeatherComponent,
    StickyNoteComponent,
    AddNotesComponent,
    ToDoComponent,
    NewYorkTimesNewsComponentComponent,
    UpdateProfileModalComponent,
    LocationViewerComponent,
    AddLocationModalComponent,
    WidgetSettingsDialogComponent],
  imports: [
    CommonModule,
    ThemeModule,
    CoreModule,
    GridsterModule,
    DynamicModule,
    DashboardRoutingModule
  ],
  providers: [
    DashboardService,
    WidgetCommunicationService
  ]
})
export class DashboardModule {
}
