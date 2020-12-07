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

io.on('connection', function(socket){
    console.log('[SOCKET CONNECTED]' + socket.id);
    socket.emit('user-count-update', Object.keys(chatUsers).length);
    socket.join('pool');    //Un pool pentru toti utilizatorii conectati la server dar nu neaparat in chat, pentru a le putea trimite numarul de utilizatori din chat
    
    socket.on('join-chat', function(userName, color){
        console.log('[USER JOINED CHAT', socket.id, userName);
        chatUsers[socket.id] = userName;
        messageColors[socket.id] = color;
        socket.join('chat');
        socket.emit('join-chat');
        io.to('pool').emit('user-count-update', Object.keys(chatUsers).length);
        io.to('chat').emit('new-user', userName);
    });

    socket.on('send-message', function(message){
        console.log('[USER SENT MESSAGE]', message);
        io.to('chat').emit('new-message', messageDetails = {
            userName: chatUsers[socket.id],
            messageText: message,
            messageColor: messageColors[socket.id]
        });
    });

    socket.on('leave-chat', function(){
        console.log('[USER LEFT CHAT]', socket.id);
        userName = chatUsers[socket.id];
        delete chatUsers[socket.id];
        delete messageColors[socket.id];
        socket.emit('menu');
        io.to('pool').emit('user-count-update', Object.keys(chatUsers).length); 
        socket.leave('chat');
        io.to('chat').emit('user-left', userName);
    });

    socket.on('disconnect', function(){
        console.log('[USER DISCONNECTED]' + socket.id);
        userName = chatUsers[socket.id];
        delete chatUsers[socket.id];
        delete messageColors[socket.id];
        io.to('pool').emit('user-count-update', Object.keys(chatUsers).length);
        socket.leave('chat');
        io.to('chat').emit('user-left', userName);

    });

});

const chatUsers = {};
const messageColors = {};