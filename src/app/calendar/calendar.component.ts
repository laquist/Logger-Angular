import { Component, OnInit, ViewChild, Input, Output, OnChanges, SimpleChanges, EventEmitter } from '@angular/core';

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
export class CalendarComponent implements OnInit, OnChanges {

  @ViewChild(ngCalenderComponent) ucCalendar: ngCalenderComponent;
  calendarOptions: Options;

  @Input() eventsInput;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.createCalendar();
    // this.updateEvents();
    setTimeout(() => this.updateEvents(), 1000);
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('ngOnChanges() called!');
    console.log(changes);

    if (changes['eventsInput']) {
      this.updateEvents();
    }
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

    this.updateEvents();
  }

  updateEvents(): void {
    let calendarExisting: boolean;

    console.log('');

    if (this.ucCalendar) {
      console.log('SUCCESS - ucCalendar existing!');
      calendarExisting = true;
    } else {
      console.log('FAIL - ucCalendar not existing!');
    }

    if (calendarExisting) {
      console.log('SUCCESS - Updating EventSource');
      this.ucCalendar.fullCalendar('removeEventSources');
      this.ucCalendar.fullCalendar('addEventSource', this.eventsInput);
    } else {
      console.log('ERROR - EventSource not updated because ucCalendar not existing.');
    }

    // console.log('');
    // console.log('ucCalendar:');
    // if (this.ucCalendar) {
    //   console.log(this.ucCalendar.);
    // }
    // if (this.ucCalendar) {
    //   this.ucCalendar.fullCalendar('removeEventSources');
    //   this.ucCalendar.fullCalendar('addEventSource', this.eventsInput);
    // } else {
    //   console.log('ucCalendar not existing!');
    // }

    // setTimeout(() => console.log('*'), 1000);
    // setTimeout(() => console.log(this.ucCalendar), 1000);
    // this.ucCalendar.fullCalendar('removeEventSources');
    // this.ucCalendar.fullCalendar('addEventSource', this.eventsInput);
  }

  clearEvents(): void {
    this.calendarOptions.events = [];

    console.log('Cleared events');
  }

  test() {
    console.log('test');
  }
}
