import { Component, OnInit, ViewChild } from '@angular/core';

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

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.createTestData();
    this.createCalendar();
  }

  createCalendar(): void {
    this.calendarOptions = {
      editable: false,
      eventLimit: true,
      defaultView: 'listYear',
      locale: 'da',
      timeFormat: 'H:mm',
      slotLabelFormat: 'H:mm',
      nowIndicator: true,
      aspectRatio: 2,
      header: {
        left: 'prev, next today',
        center: 'title',
        right: 'month, basicWeek, agendaDay, listYear'
      },
      events: []
    };
  }

  getEvents(): void {
    this.dataService.getEvents().subscribe(events => {
      this.events = events;
      this.ucCalendar.renderEvents(this.events);
    });
  }

  tester(event): void {
    console.log('Event Clicked!');
    console.log(event);
  }

}