const express = require('express');
const app = express();                           
const http = require('http').createServer(app);
const io = require('socket.io')(http);

http.listen(5050, function(){                      
    console.log('[SERVER STARTED AT PORT 5050]');     
})

 app.get('/', function(request, response){
     response.sendFile(__dirname + '/index.html');
 });

 app.use(express.static(__dirname + '/public'));


var counter = 0;

io.on('connection', function(socket){
    console.log('[CLIENT CONNECTED WITH ID ]' + socket.id);
    console.log(counter);
    socket.join('clients');
    socket.emit('counter-update', counter);

    socket.on('increment', function(cnt){
        counter = cnt;
        io.to('clients').emit('counter-update', counter);
    })
});