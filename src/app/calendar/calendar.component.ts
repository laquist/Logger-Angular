import { Component, OnInit } from '@angular/core';

import { DataService } from '../data.service';

import * as $ from 'jquery';
import * as moment from 'moment';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.createCalendar();
    this.updateEvents();
  }

  createCalendar(): void {
    $('#calendar').fullCalendar({
        header: {
            left: 'prev,next today',
            center: 'title',
            right: 'month,basicWeek,basicDay'
        },
        navLinks: true, // can click day/week names to navigate views
        editable: true,
        eventLimit: true, // allow "more" link when too many events
        defaultDate: moment(),
        firstDay: 1, // Monday
        locale: 'da',
        timeFormat: 'h:mm', // Removes 'a' and 'p' after time (11:45a)
    });

  }

  updateEvents(): void {
    // Removes all EventSources and adds the EventSource again (to update it on the page)
    // @ts-ignore
    $('#calendar').fullCalendar( 'removeEventSources' ); // ** Denne skal udkommenteres hver gang, for at kunne ng serve!!
    $('#calendar').fullCalendar( 'addEventSource', this.dataService.events );

    console.log($('#calendar').fullCalendar( 'getEventSources' ));
    console.log('Updated events');
  }
}
