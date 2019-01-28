import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';

import { DataService } from '../data.service';
import { CalendarComponent as ngCalenderComponent } from 'ng-fullcalendar';
import { Options } from 'fullcalendar';

import * as moment from 'moment';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  @ViewChild(ngCalenderComponent) ucCalendar: ngCalenderComponent;
  calendarOptions: Options;

  events: [];
  doubleChecked = false;

  // TESTS:
  // Source

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.createCalendar();
    this.getEvents();
  }

  createCalendar(): void {
    this.calendarOptions = {
      editable: true,
      eventLimit: true,
      defaultView: 'listYear',
      locale: 'da',
      timeFormat: 'H:mm',
      slotLabelFormat: 'H:mm',
      nowIndicator: true,
      header: {
        left: 'prev, next today',
        center: 'title',
        right: 'month, basicWeek, agendaDay, listYear'
      },
      events: []
    };
  }

  getEvents(): void {
    this.dataService.events.subscribe(events => {
      this.events = events;
      this.updateEvents();
    });
  }

  updateEvents(): void {
    if (this.ucCalendar) {
      console.log('ucCalendar is TRUE');
      // console.log('SUCCESS - Updating EventSource');
      this.ucCalendar.fullCalendar('removeEventSources');
      this.ucCalendar.fullCalendar('addEventSource', this.events);

      console.log('Updated events!');
    } else {
      if (!this.doubleChecked) {
        console.log('ucCalendar is FALSE!');
        setTimeout(() => this.updateEvents(), 100);

        this.doubleChecked = true;
        console.log('Double checking...');
      }
      // console.log('FAIL - ucCalendar not existing!');
    }
  }

  tester(): void {
    console.log('TEST');
  }
}
