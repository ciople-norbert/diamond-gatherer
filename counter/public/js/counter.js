const socket = io();

var counter;

socket.on('counter-update', function(cnt){
    counter = cnt;
    document.getElementById('show-counter').innerHTML = counter;
})

document.getElementById('counter-button').addEventListener('click', function(){
    counter++;
    socket.emit('increment', counter);
});