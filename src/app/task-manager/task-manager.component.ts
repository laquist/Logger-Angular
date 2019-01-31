import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Task } from '../task';

@Component({
  selector: 'app-task-manager',
  templateUrl: './task-manager.component.html',
  styleUrls: ['./task-manager.component.scss']
})
export class TaskManagerComponent implements OnInit {

  tasks: Task[];

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.createTestData();
    this.getTasks();
  }

  getTasks(): void {
    this.dataService.getTasks().subscribe(tasks => this.tasks = tasks);
  }

  deleteTask(id: number): void {
    this.dataService.removeTask(id);
  }

  tester(): void {
    console.log('events');
    console.log(this.dataService.data.events);
    console.log('tasks');
    console.log(this.dataService.data.tasks);
  }
}
