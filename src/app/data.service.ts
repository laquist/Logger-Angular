import { Injectable } from '@angular/core';
import { Task } from './task';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  tasks: Task[] = [];

  constructor(private messageService: MessageService) { }

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

        // Add to Messages
        this.messageService.add(formatted);
      });
    });
  }
}
