export class Person{
    constructor(details){
        this.name = details.name;
        this.age = details.age;
        this.sex = details.sex;
        this.nationality = details.nationality;
    }

    printDetails(){
        console.log(`${this.name} is ${this.age} years old. Their sex is ${this.sex} and nationality is ${this.nationality}.`);
    }

    birthday(){
        this.age++;
        console.log(`Happy birthday to ${this.name}, they are now ${this.age} years old.`);
    }
}