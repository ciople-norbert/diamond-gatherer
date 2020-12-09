const canvas = document.getElementById('squareCanvas');
/** @type {CanvasRenderingContext2D} */
const context = canvas.getContext('2d');
document.getElementById("squareButton").onclick = function () {
    let colors = ['black', 'red', 'blue', 'green', 'yellow', 'purple', 'orange', 'pink'];
    let edgeSize = Math.floor(Math.random() * 300) + 20;
    let width = canvas.width;
    let height = canvas.height;
    context.clearRect(0, 0, width, height);
    context.fillStyle = colors[Math.floor(Math.random() * colors.length)];
    context.fillRect(Math.floor(Math.random() * (width - edgeSize)), Math.floor(Math.random() * (height - edgeSize)), edgeSize, edgeSize);
}

import { Employee } from "../models/employee.js"

var employee1 = new Employee({
    name: "Halle Bernstein",
    age: 41,
    sex: 'feminine',
    nationality: 'Irish',
    company: 'SunshineTech Ltd.',
    position: 'CEO',
    salary: '450000'
});

employee1.printDetails();
employee1.birthday();
employee1.promoteTo('Chairman');
employee1.changeSalary(470000);

var employee2 = new Employee({
    name: "Mika Virtanen",
    age: 19,
    sex: 'masculine',
    nationality: 'Finnish',
    company: 'Punainen Orava Oy.',
    position: 'intern',
    salary: '0'
});

employee2.printDetails();
employee2.birthday();
employee2.promoteTo('Apprentice');
employee2.changeSalary(150);

var arr = [1, -2, 6, -7, 10, 9, 14, true, false, null, undefined];
console.log(arr);
arr = arr.filter(function (value) {
    if (typeof value == 'number') {
        return value;
    }
});
console.log(arr);
arr = arr.map(function (value) {
    return value *= 10;
});
console.log(arr);
var result = 1
result = arr.reduce(function (result, value) {
    return result + value;
})
console.log(result);