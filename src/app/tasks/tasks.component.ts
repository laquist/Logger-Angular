import { Component, OnInit } from '@angular/core';

import { DataService } from '../data.service';
import * as moment from 'moment';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

  events: [];

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.createTestData();
    this.getEvents();
  }

  getEvents(): void {
    this.dataService.getEvents().subscribe(events => this.events = events);
  }

  // Burde denne være under DataService, ligesom addTask() ?
  completeTask(id: number): void {
    // Finds the task from the taskID
    const index = this.dataService.data.tasks.findIndex(element => element.id === id);
    const task = this.dataService.data.tasks[index];

    // Completes the task, and sends the Date and Time
    const completionDate = moment();
    task.complete(completionDate);

    // Creates Calendar Event
    const newEvent = {
      title: task.name,
      start: completionDate.format(),
      description: task.details,
      taskID: task.id,
      className: 'task' + task.id,
    };

    this.dataService.addEvent(newEvent);
  }
}
