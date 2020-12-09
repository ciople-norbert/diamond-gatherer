// import { Car } from "/js/car.js";

const canvas = document.getElementById('game-canvas');
/** @type {CanvasRenderingContext2D} */
const context = canvas.getContext('2d');
// const george = new Image();
// george.src = './assets/george.png';
// const mario = new Image();
// mario.src = './assets/mario.png'
// const GEORGE_WIDTH = 40;
// const GEORGE_HEIGHT = 45;
// const MARIO_WIDTH = 32;
// const MARIO_HEIGHT = 39;
// let georgeX = 100;
// let georgeY = 100;
// let marioX = 0;
// let marioY = 0;


// george.onload = () => {
//     context.drawImage(george, 0 * GEORGE_WIDTH, 0 * GEORGE_HEIGHT, GEORGE_WIDTH, GEORGE_HEIGHT, georgeX, georgeY, GEORGE_WIDTH, GEORGE_HEIGHT);
// }


// mario.onload = () => {
//     context.drawImage(mario, 0 * MARIO_WIDTH, 0 * MARIO_HEIGHT, MARIO_WIDTH, MARIO_HEIGHT, marioX, marioY, MARIO_WIDTH, MARIO_HEIGHT)
// }


// document.addEventListener("keydown", function(event){
//     context.clearRect(0, 0, 600, 400);
//     switch(event.key){
//         case 'ArrowUp' : {
//             if (georgeY > 0){
//                 georgeY -= 10;
//             }
//             break;
//         }
//         case 'ArrowDown' : {
//             if (georgeY < canvas.height - GEORGE_HEIGHT){
//                 georgeY += 10;
//             }
//             break;
//         }
//         case 'ArrowLeft' : {
//             if (georgeX > 0){
//                 georgeX -= 10;
//             }
//             break;
//         }
//         case 'ArrowRight' : {
//             if (georgeX < canvas.width - GEORGE_WIDTH){
//                 georgeX += 10;
//             }
//             break;
//         }
//         case 'w': {
//             if (marioY > 0){
//                 marioY -= 10;
//             }
//             break;
//         }
//         case 's': {
//             if (marioY < canvas.height - MARIO_HEIGHT){
//                 marioY += 10;
//             }
//             break;
//         }
//         case 'a': {
//             if (marioX > 0){
//                 marioX -= 10;
//             }
//             break;
//         }
//         case 'd': {
//             if (marioX < canvas.width - MARIO_WIDTH){
//                 marioX += 10;
//             }
//             break;
//         }
            
//     }
//     context.drawImage(mario, 0 * MARIO_WIDTH, 0 * MARIO_HEIGHT, MARIO_WIDTH, MARIO_HEIGHT, marioX, marioY, MARIO_WIDTH, MARIO_HEIGHT)
//     context.drawImage(george, 0 * GEORGE_WIDTH, 0 * GEORGE_HEIGHT, GEORGE_WIDTH, GEORGE_HEIGHT, georgeX, georgeY, GEORGE_WIDTH, GEORGE_HEIGHT);
// });


// let array1 = ["Love", "I", "Javascript"];
// delete array1[0];
// array1.splice(0, 1);
// array1.splice(1, 0, "Love");
// console.log(array1);

// let array2 = ["Paul", 1, false, { name: "Jon Snow"}, [1, 2, 3], null, undefined, function() { console.log('Test')} ]
// array2.forEach(function(item, index){
//     console.log("Pozitia: " + index + ", Valoarea: " + item, ", Tipul: " + typeof item);
// });

// let car1 = new Car('Ford', 'blue', '2ESD553Q', null, 500000);
// let car2 = new Car('Mazda', 'red', 'WW3EA1165', "Jake Morton", null);
// let car3 = new Car('Audi', 'white', 'FCJJ3EE19', 'Martha Klien', null);

// car1.printCarData();
// car1.putForSale(30000);
// car1.sell("Craig Harris");

// car2.printCarData();
// car2.putForSale(100000);
// car2.sell("Lisa Dyson");

// car3.printCarData();
// car3.putForSale(75000);
// car3.sell("Ryan Shamrock");

const socket = io();

document.getElementById('create-game').addEventListener('click', function(){
    const input = document.getElementById('game-name');
    const gameName = input.value;
    if (gameName.length > 0){
        document.getElementById('game-name-missing').classList.add('display-none');
        socket.emit('create-game', gameName);
    } else {
        document.getElementById('game-name-missing').classList.remove('display-none');
    }
    console.log(socket.id);
});

socket.on('game-loop', function(objectsForDraw){
    document.getElementById('menu').classList.add('display-none');
    document.getElementById('game-container').classList.remove('display-none');
    context.drawImage( document.getElementById('map-image'), 0, 0);

    objectsForDraw.forEach(function(objectForDraw){
        context.drawImage(
            document.getElementById(objectForDraw.imageId),
            ...objectForDraw.drawImageParameters
        )
    })
});

document.addEventListener("keydown", function(event){
     switch(event.key){
         case 'ArrowUp' : {
            socket.emit('start-moving-player', 'up');
            break;
         }
         case 'ArrowDown' : {
            socket.emit('start-moving-player', 'down');
            break;
         }        
         case 'ArrowLeft' : {
            socket.emit('start-moving-player', 'left');
            break;
         }
         case 'ArrowRight' : {
            socket.emit('start-moving-player', 'right');
            break;
         }
    }
});

document.addEventListener('keyup', function(event){
    switch(event.key){
        case 'ArrowUp' :
        case 'ArrowDown' : {
           socket.emit('stop-moving-player', 'dy');
           break;
        }        
        case 'ArrowLeft' : 
        case 'ArrowRight' : {
           socket.emit('stop-moving-player', 'dx');
           break;
        }
   }
});

socket.on('add-game-to-list', function(options){
    const gameElementContainer = document.createElement('div');
    gameElementContainer.classList.add('game-element');
    gameElementContainer.id = options.gameId;
    
    const gameNameElement = document.createElement('p');
    gameNameElement.innerHTML = options.gameName;
    const joinGameButton = document.createElement('button');
    joinGameButton.innerHTML = 'Join Game';

    joinGameButton.addEventListener('click', function(){
        socket.emit('join-game', options.gameId);
    })

    gameElementContainer.appendChild(gameNameElement);
    gameElementContainer.appendChild(joinGameButton);

    document.getElementById('game-list').appendChild(gameElementContainer);
});

socket.on('remove-game-from-list', function(gameId){
    console.log('rm ' + gameId);
    var toDelete = document.getElementById(gameId);
    toDelete.parentNode.removeChild(toDelete);
});

socket.on('game-over', function(reason){
    console.log('Game over ' + reason);
    context.font = "50px Arial";
    context.fillStyle = "red";
    context.textAlign = "center";
    context.fillText(`Game over: ${reason}`, canvas.width/2, canvas.height/2);
});

document.getElementById('back-to-menu-button').addEventListener('click', function(){
    socket.emit('user-left-game');
    document.getElementById('menu').classList.remove('display-none');
    document.getElementById('game-container').classList.add('display-none')
});
