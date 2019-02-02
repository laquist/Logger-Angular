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
  taskFormModel = {
    name: '',
    details: '',
    id: null
  }

  edit = false;
  formSubmitBtnText = 'Submit';

  constructor(
    private dataService: DataService,
    private modalService: BsModalService
    ) { }

  ngOnInit() {
    this.dataService.createTestData();
    this.getTasks();
  }

  openModal(template: TemplateRef<any>, fieldsModel): void {

    if (fieldsModel) {
      this.taskFormModel.name = fieldsModel.name;
      this.taskFormModel.details = fieldsModel.details;
      this.taskFormModel.id = fieldsModel.id;
      this.edit = true;
      this.formSubmitBtnText = 'Edit';
    }
    else {
      this.taskFormModel.name = '';
      this.taskFormModel.details = '';
      this.edit = false;
      this.formSubmitBtnText = 'Submit';
    }

    this.modalRef = this.modalService.show(template);
  }

  getTasks(): void {
    this.dataService.getTasks().subscribe(tasks => this.tasks = tasks);
  }

  submit(taskInfo, edit): void {
    if (edit) {
      this.editTask(taskInfo);
    }
    else {
      this.createTask(taskInfo);
    }
  }

  createTask(newTaskInfo): void {
    this.dataService.addTask(newTaskInfo);
  }

  deleteTask(id: number): void {
    this.dataService.removeTask(id);
  }

  editTask(taskInfo): void {
    const index = this.tasks.findIndex(element => element.id === taskInfo.id);

    if (this.tasks[index].name !== taskInfo.name || this.tasks[index].details !== taskInfo.details) {
      this.dataService.editTask(taskInfo);
    }
  }
}
