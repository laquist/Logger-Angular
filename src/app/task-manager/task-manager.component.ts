import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { DataService } from '../data.service';
import { Task } from '../task';


@Component({
  selector: 'app-task-manager',
  templateUrl: './task-manager.component.html',
  styleUrls: ['./task-manager.component.scss']
})
export class TaskManagerComponent implements OnInit {

  modalRef: BsModalRef;

  tasks: Task[];
  newTaskModel = {
    name: '',
    details: ''
  }

  constructor(
    private dataService: DataService,
    private modalService: BsModalService
    ) { }

  ngOnInit() {
    this.dataService.createTestData();
    this.getTasks();
  }

  openModal(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template);
  }

  getTasks(): void {
    this.dataService.getTasks().subscribe(tasks => this.tasks = tasks);
  }

  createTask(newTaskModel): void {
    this.dataService.addTask(newTaskModel);
  }

  deleteTask(id: number): void {
    this.dataService.removeTask(id);
  }
}
