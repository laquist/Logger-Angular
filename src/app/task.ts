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

    complete(): void {
        const timestamp = new Date();
        this.completed.push(timestamp);

        // console.log('Completed ' + this.name);
    }

    // log(): void {
    //     console.log('');
    //     console.log('Completed:');
    //     console.log(this.completed);
    // }
}
