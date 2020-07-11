import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DashboardRoutingModule} from './dashboard-routing.module';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {CardComponent} from './components/card/card.component';
import {ThemeModule} from '../../@theme/theme.module';
import {GridsterModule} from 'angular-gridster2';
import {DynamicModule} from 'ng-dynamic-component';
import {DashboardService} from './services/dashboard.service';
import {WidgetCommunicationService} from './services/widget-communication.service';
import {YoutubeComponent} from './components/youtube/youtube.component';
import {CoronaWorldMapComponent} from './components/corona-world-map/corona-world-map.component';
import {CoronaWorldTableComponent} from './components/corona-world-table/corona-world-table.component';
import {CoronaMetricsComponent} from './components/corona-metrics/corona-metrics.component';
import {CoronaWorldChartComponent} from './components/corona-world-chart/corona-world-chart.component';
import {CloclAnalogueComponent} from './components/clock-analogue/clocl-analogue.component';
import {NepaliCalendarComponent} from './components/nepali-calendar/nepali-calendar.component';
import {WeatherComponent} from './components/weather/weather.component';
import {StickyNoteComponent} from './components/sticky-note/sticky-note.component';
import {CoreModule} from '../../@core/core.module';
import { AddNotesComponent } from './components/add-notes/add-notes.component';
import { ToDoComponent } from './components/to-do/to-do.component';

@NgModule({
  declarations: [
    DashboardComponent,
    CardComponent,
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
    ToDoComponent],
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
