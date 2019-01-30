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
  // --
  // eventSource = new BehaviorSubject<any>([]);
  eventSource = new BehaviorSubject<any>(this.data.events);
  // events = this.eventSource.asObservable();

  tasksSource = new BehaviorSubject<any>(this.data.tasks);
  // tasks = this.tasksSource.asObservable();

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
          className: 'task' + this.data.tasks[0].id,
        };

        const newEventTwo = {
          title: this.data.tasks[1].name,
          start: moment().subtract(1, 'days').format(),
          description: this.data.tasks[1].details,
          taskID: this.data.tasks[1].id,
          className: 'task' + this.data.tasks[1].id,
        };

        const newEventThree = {
          title: this.data.tasks[2].name,
          start: moment().subtract(2, 'days').format(),
          description: this.data.tasks[2].details,
          taskID: this.data.tasks[2].id,
          className: 'task' + this.data.tasks[2].id,
        };

        const newEventFour = {
          title: this.data.tasks[3].name,
          start: moment().subtract(3, 'days').format(),
          description: this.data.tasks[3].details,
          taskID: this.data.tasks[3].id,
          className: 'task' + this.data.tasks[3].id,
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
    if (this.data.events.length !== 0) {
      const nextID = this.data.events[this.data.events.length - 1].id + 1;
      event.id = nextID;
    } else {
      event.id = 1;
    }

    this.data.events.push(event);
    this.updateEvents();
  }

  // Test denne
  addTask(newTaskInfo): void {
    // Gets next ID
    const nextID = this.data.tasks[this.data.tasks.length - 1].id + 1;

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

  // Skal testes
  // removeEvent(id: number): void {
  //   const index = this.events.findIndex(element => element.id === id);
  //   this.events.splice(index, 1);
  // }
}
