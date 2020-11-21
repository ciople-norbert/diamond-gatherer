import { Car } from "./car.js";

const canvas = document.getElementById('canvasId');
/** @type {CanvasRenderingContext2D} */
const context = canvas.getContext('2d');

const george = new Image();
george.src = './assets/george.png';

const GEORGE_WIDTH = 40;
const GEORGE_HEIGHT = 45;

let georgeX = 100;
let georgeY = 100;

george.onload = () => {
    context.drawImage(george, 0 * GEORGE_WIDTH, 0 * GEORGE_HEIGHT, GEORGE_WIDTH, GEORGE_HEIGHT, georgeX, georgeY, GEORGE_WIDTH, GEORGE_HEIGHT);
}

const mario = new Image();
mario.src = 'assets/mario.png'

const MARIO_WIDTH = 32;
const MARIO_HEIGHT = 39;

let marioX = 0;
let marioY = 0;

mario.onload = () => {
    context.drawImage(mario, 0 * MARIO_WIDTH, 0 * MARIO_HEIGHT, MARIO_WIDTH, MARIO_HEIGHT, marioX, marioY, MARIO_WIDTH, MARIO_HEIGHT)
}


document.addEventListener("keydown", function(event){
    context.clearRect(0, 0, 600, 400);
    switch(event.key){
        case 'ArrowUp' : {
            if (georgeY > 0){
                georgeY -= 10;
            }
            break;
        }
        case 'ArrowDown' : {
            if (georgeY < canvas.height - GEORGE_HEIGHT){
                georgeY += 10;
            }
            break;
        }
        case 'ArrowLeft' : {
            if (georgeX > 0){
                georgeX -= 10;
            }
            break;
        }
        case 'ArrowRight' : {
            if (georgeX < canvas.width - GEORGE_WIDTH){
                georgeX += 10;
            }
            break;
        }
        case 'w': {
            if (marioY > 0){
                marioY -= 10;
            }
            break;
        }
        case 's': {
            if (marioY < canvas.height - MARIO_HEIGHT){
                marioY += 10;
            }
            break;
        }
        case 'a': {
            if (marioX > 0){
                marioX -= 10;
            }
            break;
        }
        case 'd': {
            if (marioX < canvas.width - MARIO_WIDTH){
                marioX += 10;
            }
            break;
        }
            
    }
    context.drawImage(mario, 0 * MARIO_WIDTH, 0 * MARIO_HEIGHT, MARIO_WIDTH, MARIO_HEIGHT, marioX, marioY, MARIO_WIDTH, MARIO_HEIGHT)
    context.drawImage(george, 0 * GEORGE_WIDTH, 0 * GEORGE_HEIGHT, GEORGE_WIDTH, GEORGE_HEIGHT, georgeX, georgeY, GEORGE_WIDTH, GEORGE_HEIGHT);
});


let array1 = ["Love", "I", "Javascript"];
delete array1[0];
array1.splice(0, 1);
array1.splice(1, 0, "Love");
console.log(array1);

let array2 = ["Paul", 1, false, { name: "Jon Snow"}, [1, 2, 3], null, undefined, function() { console.log('Test')} ]
array2.forEach(function(item, index){
    console.log("Pozitia: " + index + ", Valoarea: " + item, ", Tipul: " + typeof item);
});

let car1 = new Car('Ford', 'blue', '2ESD553Q', null, 500000);
let car2 = new Car('Mazda', 'red', 'WW3EA1165', "Jake Morton", null);
let car3 = new Car('Audi', 'white', 'FCJJ3EE19', 'Martha Klien', null);

car1.printCarData();
car1.putForSale(30000);
car1.sell("Craig Harris");

car2.printCarData();
car2.putForSale(100000);
car2.sell("Lisa Dyson");

car3.printCarData();
car3.putForSale(75000);
car3.sell("Ryan Shamrock");
