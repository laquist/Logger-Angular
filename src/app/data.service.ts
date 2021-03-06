import { Injectable } from '@angular/core';
import { Task } from './task';
import { BehaviorSubject, Observable } from 'rxjs';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  data = {
    events: [],
    tasks: []
  };

  // Test denne, skal denne have this.data.events som parameter?
  // Hvis nu man henter data fra DB eller localStorage, så skal den data jo være med
  // Eller skal en metode adde hver enkelt fra DB / localStorage?

  eventSource = new BehaviorSubject<any>(this.data.events);
  tasksSource = new BehaviorSubject<any>(this.data.tasks);

  constructor() { }

  createTestData(): void {
    if (this.data.tasks.length === 0) {
      this.data.tasks.push(
        new Task(1, 'Task 1', 'Løb til Esbjerg'),
        new Task(2, 'Task 2', 'Hop til Falster'),
        new Task(3, 'Task 3', 'Slik din albue'),
        new Task(4, 'Task 4', 'Lav 100 armbøjninger')
      );

      if (this.data.events.length === 0) {
        const newEventOne = {
          title: this.data.tasks[0].name,
          start: moment().format(),
          description: this.data.tasks[0].details,
          taskID: this.data.tasks[0].id,
          // className: ['task' + this.data.tasks[0].id, 'event'],
          className: ['event'],
          eventID: 1
        };

        const newEventTwo = {
          title: this.data.tasks[1].name,
          start: moment().subtract(1, 'days').format(),
          description: this.data.tasks[1].details,
          taskID: this.data.tasks[1].id,
          // className: 'task' + this.data.tasks[1].id,
          className: ['event'],
          eventID: 2
        };

        const newEventThree = {
          title: this.data.tasks[2].name,
          start: moment().subtract(2, 'days').format(),
          description: this.data.tasks[2].details,
          taskID: this.data.tasks[2].id,
          // className: 'task' + this.data.tasks[2].id,
          className: ['event'],
          eventID: 3
        };

        const newEventFour = {
          title: this.data.tasks[3].name,
          start: moment().subtract(3, 'days').format(),
          description: this.data.tasks[3].details,
          taskID: this.data.tasks[3].id,
          // className: 'task' + this.data.tasks[3].id,
          className: ['event'],
          eventID: 4
        };

        if (this.data.events.length === 0) {
          this.data.events.push(newEventOne, newEventTwo, newEventThree, newEventFour);
          this.updateEvents();
        }
      }
    }
  }

  getTasks(): Observable<Task[]> {
    return this.tasksSource.asObservable();
  }

  getEvents(): Observable<any> {
    return this.eventSource.asObservable();
  }

  addEvent(event: any): void {
    // Gives the event an id
    event.eventID = this.findNextID(this.data.events, 'eventID');

    this.data.events.push(event);
    this.updateEvents();
  }

  // Test denne
  addTask(newTaskInfo): void {
    // Gives the task an id
    const nextID = this.findNextID(this.data.tasks, 'id');

    const newTask = new Task(nextID, newTaskInfo.name, newTaskInfo.details);

    this.data.tasks.push(newTask);

    // Updates the Observable, and gives new info to all subscribed
    this.updateTasks();
  }

  updateEvents(): void {
    this.eventSource.next(this.data.events);
  }

  updateTasks(): void {
    this.tasksSource.next(this.data.tasks);
  }

  findNextID(array: any[], propertyToFind): number {
    // Den fejler, hvis propertien ikke findes på det sidste object i array'et.
    // ToDo: Gør at denne fejl bliver catch'et og løst et sted.

    if (array.length !== 0) {
      return array[array.length - 1][propertyToFind] + 1;
    } else {
      return 1;
    }
  }

  // Skal testes
  removeEvent(id: number): void {
    const index = this.data.events.findIndex(element => element.eventID === id);
    this.data.events.splice(index, 1);
  }

  removeTask(id: number): void {
    const index = this.data.tasks.findIndex(element => element.id === id);
    this.data.tasks.splice(index, 1);
  }

  editTask(taskInfo): void {
    const index = this.data.tasks.findIndex(element => element.id === taskInfo.id);
    console.log('editTask -> BEFORE');
    console.log(this.data.tasks[index]);
    this.data.tasks[index].name = taskInfo.name;
    this.data.tasks[index].details = taskInfo.details;
    console.log('editTask -> AFTER');
    console.log(this.data.tasks[index]);
  }

  logData(): void {
    console.log('events');
    console.log(this.data.events);
    console.log('tasks');
    console.log(this.data.tasks);
  }
}
