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

  events;
  newEvents;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.createCalendar();
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
      this.ucCalendar.renderEvents(this.events);

      // console.log('ucCalendar renderEvents() called (from getEvents() subscription)');
    });
  }

  tester(): void {
    this.newEvents = this.ucCalendar.eventsModel;
    console.log('');
    console.log('newEvents:');
    console.log(this.newEvents);
  }

  testerTwo(): void {
    this.tester();

    this.newEvents.forEach(element => {
      console.log(element.start._d);
    });
  }

  testerThree(event): void {
    console.log('');
    console.log('testerThree():');
    console.log(event);
    const time = moment(event.event.start);
    console.log('time:');
    console.log(time);
    console.log('formatted:');
    console.log(time.format('DD-MM-YYYY HH:mm'));
  }

  // eventFired(event): void {
  //   console.log('');
  //   console.log('eventFired()');
  //   console.log(event);
  // }
}
