import {Person} from "./person.js";

export class Employee extends Person{
    constructor(details){
        super(details);
        this.company = details.company;
        this.position = details.position;
        this.salary = details.salary;
    }

    printDetails(){
        super.printDetails();
        console.log(`They work at ${this.company} as ${this.position} for a salary of ${this.salary}.`);
    }

    changeSalary(amount){
        this.salary = amount;
        console.log(`${this.name} now has a salary of ${this.salary}.`);
    }

    promoteTo(newPosition){
        this.position = newPosition;
        console.log(`Congratulations to ${this.name} who has been promoted to ${this.position}.`);
    }
}