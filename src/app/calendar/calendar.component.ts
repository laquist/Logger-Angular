import { Component, OnInit, ViewChild, Input } from '@angular/core';

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

  @Input() eventsInput;
  @Input() eventsInputTwo;
  events: null;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.createCalendar();
    this.updateEvents();
  }

  createCalendar(): void {
  this.calendarOptions = {
      editable: true,
      eventLimit: false,
      header: {
        left: 'prev, next today',
        center: 'title',
        right: 'month, basicWeek, basicDay'
        // right: 'month,agendaWeek,agendaDay,listMonth'
      },
      events: []
    };
  }

  clearEvents(): void {
    this.calendarOptions.events = [];

    console.log('Cleared events');
  }

  updateEvents(): void {
    // this.ucCalendar.fullCalendar('rerenderEvents');

    // this.ucCalendar.fullCalendar('removeEventSources');
    // this.ucCalendar.fullCalendar('addEventSource', this.eventsInputTwo);

    console.log('');
    console.log('this.eventsInputTwo before:');
    console.log(this.eventsInputTwo);

    console.log('this.events before:');
    console.log(this.events);

    this.events = this.eventsInputTwo;

    console.log('////////////////////');

    console.log('this.events after:');
    console.log(this.events);
  }
}
