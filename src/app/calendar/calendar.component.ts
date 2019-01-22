import { Component, OnInit, ViewChild } from '@angular/core';

import { DataService } from '../data.service';
import { CalendarComponent as ngCalenderComponent } from 'ng-fullcalendar';
import { Options } from 'fullcalendar';

import * as $ from 'jquery';
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

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.createCalendar();
    this.getEvents();
  }

  createCalendar(): void {
  this.calendarOptions = {
      editable: true,
      eventLimit: true,
      // defaultView: 'basicWeek',
      locale: 'da',
      timeFormat: 'H:mm',
      slotLabelFormat: 'H:mm',
      nowIndicator: true,
      header: {
        left: 'prev, next today',
        center: 'title',
        right: 'month, basicWeek, agendaDay, listMonth'
      },
      views: {
        basicWeek: {
          columnFormat: 'ddd DD/MM'
        }
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
      // console.log('SUCCESS - Updating EventSource');
      this.ucCalendar.fullCalendar('removeEventSources');
      this.ucCalendar.fullCalendar('addEventSource', this.events);
    } else {
      // console.log('FAIL - ucCalendar not existing!');
    }
  }
}
