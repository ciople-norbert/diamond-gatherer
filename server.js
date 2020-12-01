const Player = require('./player.js');
const Game = require('./game.js');
const express = require('express');                   //Import librarie 'express' (web server)
const app = express();                           
const http = require('http').createServer(app);
const io = require('socket.io')(http);

http.listen(5000, function(){                        //5000 = nr. port
    console.log('[SERVER STARTED AT PORT 500]');     //Callback la pornirea serverului
})

app.get('/', function(request, response){           //Raspuns pentru ruta 'home' (/)
    response.sendFile(__dirname + '/index.html');
});

app.get('/about', function(request, response){
    response.sendFile(__dirname + '/about.html');
})

app.use(express.static(__dirname + '/public'));

io.on('connection', function(socket){               //Event care asculta la fiecare client care se conecteaza
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
    })

    socket.on('send-message', function(message){
        console.log('[USER SENT MESSAGE]', message);
        io.to('chat').emit('new-message', messageDetails = {
            userName: chatUsers[socket.id],
            messageText: message,
            messageColor: messageColors[socket.id]
        });
    })

    socket.on('leave-chat', function(){
        console.log('[USER LEFT CHAT]', socket.id);
        userName = chatUsers[socket.id];
        delete chatUsers[socket.id];
        delete messageColors[socket.id];
        socket.emit('menu');
        io.to('pool').emit('user-count-update', Object.keys(chatUsers).length); 
        socket.leave('chat');
        io.to('chat').emit('user-left', userName);
    })

    socket.on('create-game', function(gameName){
        console.log('[NEW GAME CREATED]');
        const players = [new Player()];
        const gameId = socket.id;
        const game = new Game({
            id: gameId,
            players: players
        });
        setInterval(function(){gameLoop(gameId)}, 1000/60);
        games[gameId] = game;
        socket.join[gameId];
    });

    socket.on('disconnect', function(){
        console.log('[USER DISCONNECTED]' + socket.id);
        userName = chatUsers[socket.id];
        delete chatUsers[socket.id];
        delete messageColors[socket.id];
        io.to('pool').emit('user-count-update', Object.keys(chatUsers).length);
        socket.leave('chat');
        io.to('chat').emit('user-left', userName);

    })
});

function gameLoop(id){
    const objectsForDraw = [];
    games[id].players.forEach(function (player) {
        objectsForDraw.push(player.forDraw());
    })
    io.to(id).emit('game-loop', objectsForDraw);
}


const chatUsers = {};
const messageColors = {};
const games = {};
