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

  // events: [];
  events;
  doubleChecked = false;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.createCalendar();

    setTimeout(() => this.tester(), 1000);
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
      // this.updateEvents();

      console.log('ucCalendar renderEvents() called (from getEvents() subscription)');
      this.ucCalendar.renderEvents(this.events);
    });
  }

  // updateEvents(): void {
  //   if (this.ucCalendar) {
  //     this.ucCalendar.fullCalendar('removeEventSources');
  //     this.ucCalendar.fullCalendar('addEventSource', this.events);

  //     console.log('Updated events!');
  //   } else {
  //     if (!this.doubleChecked) {
  //       setTimeout(() => this.updateEvents(), 100);

  //       this.doubleChecked = true;
  //       console.log('Double checking...');
  //     }
  //   }
  // }

  // tester(): void {
  //   console.log('');
  //   console.log('getCalendar:');
  //   console.log(this.ucCalendar.fullCalendar('getCalendar'));

  //   // Get eventsModel
  //   // console.log('');
  //   // console.log('resourceRender');
  //   // console.log(this.ucCalendar.resourceRender.subscribe((x) => console.log(x)));
  // }

  eventFired(event): void {
    console.log('');
    console.log('eventFired()');
    console.log(event);
  }

  tester(): void {
    // console.log('');
    // console.log('renderEvents (from tester())');
    // this.ucCalendar.renderEvents(this.events);
  }
}
