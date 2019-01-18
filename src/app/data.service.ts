import { Injectable } from '@angular/core';
import { Task } from './task';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  tasks: Task[] = [];
  events = [];

  constructor() { }

  createTestData(): void {
    if (this.tasks.length === 0) {
      this.tasks.push(
        new Task(1, 'Øvelse 1', 'Løb til Esbjerg'),
        new Task(2, 'Øvelse 2', 'Hop til Falster'),
        new Task(3, 'Øvelse 3', 'Slik din albue'),
        new Task(4, 'Øvelse 4', 'Lav 100 armbøjninger')
      );

      console.log('Created testdata..');
    }
  }

  getAllCompleted(): void {
    this.tasks.forEach(task => {
      task.completed.forEach(date => {
        const completeString = task.name + ' completed at: ' + date.toString();

        const formatted = completeString.split(' GMT')[0];

        // Logs result
        console.log(formatted);
      });
    });
  }

  addEvent(event): void {
    // Gives the event an id
    if (this.events.length !== 0) {
      const nextID = this.events[this.events.length - 1].id + 1;
      event.id = nextID;
    } else {
      event.id = 1;
    }

    this.events.push(event);
  }

  // Skal testes
  // removeEvent(id: number): void {
  //   const index = this.events.findIndex(element => element.id === id);
  //   this.events.splice(index, 1);
  // }



  // TEST
  // Prøv at gøre det med obserables, som i dette eksempel:
  // https://github.com/ng-fullcalendar/ng-fullcalendar-demo/tree/master/src/app
  getEventsTest(): Observable<any> {
    return of(this.events);
  }
}
