import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavComponent } from './nav/nav.component';
import { TasksComponent } from './tasks/tasks.component';
import { CalendarComponent } from './calendar/calendar.component';
import { TaskManagerComponent } from './task-manager/task-manager.component';

import { FullCalendarModule } from 'ng-fullcalendar';

import { CollapseModule } from 'ngx-bootstrap/collapse';
import { ModalModule } from 'ngx-bootstrap/modal';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTools, faTrashAlt } from '@fortawesome/free-solid-svg-icons'; // Add Icons Here

@NgModule({
  declarations: [
    AppComponent,
    TasksComponent,
    NavComponent,
    CalendarComponent,
    HomeComponent,
    TaskManagerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    FullCalendarModule,
    CollapseModule,
    FontAwesomeModule,
    ModalModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    // Add an icon to the library for convenient access in other components
    library.add(faTools, faTrashAlt);
  }
 }
