import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BacklogComponent } from './backlog/backlog.component';
import { TaskComponent } from './task/task.component';
import { TasklistComponent } from './tasklist/tasklist.component';
import { TaskdetailComponent } from './taskdetail/taskdetail.component';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {MatListModule} from '@angular/material/list';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import {MatSidenavModule} from '@angular/material/sidenav';
import { TaskformComponent } from './taskform/taskform.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDatepicker, MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatTabsModule} from '@angular/material/tabs';
import { HomeComponent } from './home/home.component';
import { SprintComponent } from './sprint/sprint.component';
import { SprintBacklogComponent } from './sprint-backlog/sprint-backlog.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { TimelogComponent } from './timelog/timelog.component';
import { SprintFormComponent } from './sprint-form/sprint-form.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { TeamDashboardComponent } from './team-dashboard/team-dashboard.component';
import { MemberformComponent } from './memberform/memberform.component';
import { TimeformComponent } from './timeform/timeform.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { MemberBarchartComponent } from './member-barchart/member-barchart.component';

@NgModule({
  declarations: [
    AppComponent,
    BacklogComponent,
    TaskComponent,
    TasklistComponent,
    TaskdetailComponent,
    TaskformComponent,
    HomeComponent,
    SprintComponent,
    SprintBacklogComponent,
    TimelogComponent,
    SprintFormComponent,
    TeamDashboardComponent,
    MemberformComponent,
    TimeformComponent,
    MemberBarchartComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatListModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    MatSidenavModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTabsModule,
    MatExpansionModule,
    MatAutocompleteModule,
    MatGridListModule,
    MatPaginatorModule,
    MatSortModule,
    HighchartsChartModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
