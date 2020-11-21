const canvas = document.getElementById('squareCanvas');
/** @type {CanvasRenderingContext2D} */
const context = canvas.getContext('2d');

document.getElementById("squareButton").onclick = function (){;
    let colors = ['black', 'red', 'blue', 'green', 'yellow', 'purple', 'orange', 'pink'];
    let edgeSize = Math.floor(Math.random() * 300) + 20
    let width = canvas.width;
    let height = canvas.height;
    
    context.clearRect(0, 0, width, height);
    context.fillStyle = colors[Math.floor(Math.random() * colors.length)]
    context.fillRect(Math.floor(Math.random() * (width - edgeSize)), Math.floor(Math.random() * (height - edgeSize)), edgeSize, edgeSize);
}


