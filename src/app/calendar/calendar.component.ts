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
  @Input() twoWayTest;

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
      defaultView: 'basicWeek',
      header: {
        left: 'prev, next today',
        center: 'title',
        right: 'month, basicWeek, agendaDay'
        // right: 'month, basicWeek, basicDay'
        // right: 'month,agendaWeek,agendaDay,listMonth'
      },
      events: []
    };

    this.updateEvents();
  }

  updateEvents(): void {

    console.log('');

    if (this.ucCalendar) {
      // console.log('SUCCESS - ucCalendar existing!');

      console.log('SUCCESS - Updating EventSource');
      this.ucCalendar.fullCalendar('removeEventSources');
      this.ucCalendar.fullCalendar('addEventSource', this.eventsInput);
    } else {
      // console.log('FAIL - ucCalendar not existing!');
    }
  }

  clearEvents(): void {
    this.calendarOptions.events = [];

    console.log('Cleared events');
  }
}
