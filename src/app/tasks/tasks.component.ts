import { Component, OnInit, EventEmitter, Output } from '@angular/core';

import { DataService } from '../data.service';
import * as moment from 'moment';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

  @Output() clickEmitter = new EventEmitter();

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.createTestData();
  }

  completeTask(id: number): void {
    // Finds the task from the taskID
    const index = this.dataService.tasks.findIndex(element => element.id === id);
    const task = this.dataService.tasks[index];

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

    this.clickEmitter.emit(true);
  }

  test() {
    console.log('test');
  }
}
