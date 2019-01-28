import { Injectable } from '@angular/core';
import { Task } from './task';
import { BehaviorSubject } from 'rxjs';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  tasks: Task[] = [];

  data = {
    events: [],
  };

  // Test denne, skal denne have this.data.events som parameter?
  // Hvis nu man henter data fra DB eller localStorage, så skal den data jo være med
  // Eller skal en metode adde hver enkelt fra DB / localStorage?
  // --
  // eventSource = new BehaviorSubject<any>([]);
  eventSource = new BehaviorSubject<any>(this.data.events);
  events = this.eventSource.asObservable();

  constructor() { }

  createTestData(): void {
    if (this.tasks.length === 0) {
      this.tasks.push(
        new Task(1, 'Øvelse 1', 'Løb til Esbjerg'),
        new Task(2, 'Øvelse 2', 'Hop til Falster'),
        new Task(3, 'Øvelse 3', 'Slik din albue'),
        new Task(4, 'Øvelse 4', 'Lav 100 armbøjninger')
      );

      if (this.data.events.length === 0) {
        const newEventOne = {
          title: this.tasks[0].name,
          start: moment().format(),
          description: this.tasks[0].details,
          taskID: this.tasks[0].id,
          className: 'task' + this.tasks[0].id,
        };

        const newEventTwo = {
          title: this.tasks[1].name,
          start: moment().subtract(1, 'days').format(),
          description: this.tasks[1].details,
          taskID: this.tasks[1].id,
          className: 'task' + this.tasks[1].id,
        };

        const newEventThree = {
          title: this.tasks[2].name,
          start: moment().subtract(2, 'days').format(),
          description: this.tasks[2].details,
          taskID: this.tasks[2].id,
          className: 'task' + this.tasks[2].id,
        };

        const newEventFour = {
          title: this.tasks[3].name,
          start: moment().subtract(3, 'days').format(),
          description: this.tasks[3].details,
          taskID: this.tasks[3].id,
          className: 'task' + this.tasks[3].id,
        };

        this.data.events.push(newEventOne, newEventTwo, newEventThree, newEventFour);
        this.refreshCalendar();
      }

      // console.log('Created testdata..');
    }
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
    this.refreshCalendar();
  }

  logRawEvents(): void {
    console.log('Raw Events:');
    console.log(this.data.events);
  }

  refreshCalendar(): void {
    this.eventSource.next(this.data.events);
  }

  // Skal testes
  // removeEvent(id: number): void {
  //   const index = this.events.findIndex(element => element.id === id);
  //   this.events.splice(index, 1);
  // }
}
