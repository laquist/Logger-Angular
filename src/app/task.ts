export class Task {

    id: number;
    name: string;
    details: string;
    completed: Date[] = [];

    constructor(id: number, name: string, details: string) {
        this.id = id;
        this.name = name;
        this.details = details;
    }

    complete(timestamp): void {
        this.completed.push(timestamp);
    }
}
