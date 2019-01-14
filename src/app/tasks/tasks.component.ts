import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { MessageService } from '../message.service';
// import { Task } from '../task';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

  constructor(
    private dataService: DataService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.dataService.createTestData();
  }

  completeTask(id: number): void {
    const index = this.dataService.tasks.findIndex(element => element.id === id);
    const task = this.dataService.tasks[index];
    task.complete();


    // Add som en message somehow
    this.messageService.add('Completed ' + task.name);
  }
}
