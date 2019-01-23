import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NavComponent } from './nav/nav.component';
import { TasksComponent } from './tasks/tasks.component';
import { CalendarComponent } from './calendar/calendar.component';

import { FullCalendarModule } from 'ng-fullcalendar';
import { CollapseModule } from 'ngx-bootstrap/collapse';

const appRoutes: Routes = [
  { path: 'tasks', component: TasksComponent },
  { path: 'task/:id', component: TasksComponent },
  { path: 'calendar', component: CalendarComponent },
  { path: '', redirectTo: '/tasks', pathMatch: 'full' },
  // { path: '**', component: PageNotFoundComponent } // ToDo
];

@NgModule({
  declarations: [
    AppComponent,
    TasksComponent,
    NavComponent,
    CalendarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FullCalendarModule,
    CollapseModule,
    // RouterModule.forRoot(appRoutes),
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only),
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
