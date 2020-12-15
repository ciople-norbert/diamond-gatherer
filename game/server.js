const SpaceRanger = require('./models/space_ranger.js');
const PinkLady = require('./models/pink_lady.js');
const Game = require('./models/game.js');
const Bullet = require('./models/bullet.js')

const express = require('express');                   //Import librarie 'express' (web server)
const { clearInterval } = require('timers');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

http.listen(5000, function () {                        //5000 = nr. port
    console.log('[SERVER STARTED AT PORT 500]');     //Callback la pornirea serverului
})

app.get('/', function (request, response) {           //Raspuns pentru ruta 'home' (/)
    response.sendFile(__dirname + '/index.html');
});

app.get('/about', function (request, response) {
    response.sendFile(__dirname + '/about.html');
})

app.use(express.static(__dirname + '/public'));

io.on('connection', function (socket) {               //Event care asculta la fiecare client care se conecteaza
    console.log('[SOCKET CONNECTED]' + socket.id);
    socket.join('menu');
    Object.keys(games).forEach(function (gameId) {
        if (games[gameId].players.length == 1) {
            socket.emit('add-game-to-list', { gameName: games[gameId].name, gameId: gameId })
        }
    });

    socket.on('create-game', function (gameName) {
        console.log('[NEW GAME CREATED]');
        const gameId = socket.id;
        players[socket.id] = new SpaceRanger({ gameId: gameId, socketId: socket.id });
        const game = new Game({
            id: gameId,
            players: [players[socket.id]],
            name: gameName
        });
        games[gameId] = game;
        socket.join[gameId];
        io.to('menu').emit('add-game-to-list', { gameName: gameName, gameId: gameId });
    });

    socket.on('start-moving-player', function (direction) {
        if (players[socket.id]) {
            if (games[players[socket.id].gameId].players.length != 2) {
                return;
            }
            players[socket.id].startMoving(direction);
        }
    });

    socket.on('stop-moving-player', function (axis) {
        if (players[socket.id]) {
            if (games[players[socket.id].gameId].players.length != 2) {
                return;
            }
            players[socket.id].stopMoving(axis);
        }
    });

    socket.on('join-game', function (gameId) {
        players[socket.id] = new PinkLady({ gameId: gameId, socketId: socket.id });
        games[gameId].players.push(players[socket.id]);
        games[gameId].generateDiamonds();
        socket.join(gameId);
        io.to('menu').emit('remove-game-from-list', gameId);
    });

    socket.on('attack', function (gameId) {
        if (players[socket.id]) {
            if (games[players[socket.id].gameId].players.length != 2) {
                return;
            }
            if (players[socket.id].hasActiveBullet) {
                return;
            }
            console.log('ATTACK');
            const game = games[players[socket.id].gameId];
            game.bullets.push(new Bullet(players[socket.id]));

        }

    });

    socket.on('user-left-game', function () {
        console.log('[USER LEFT GAME]' + socket.id);
        if (players[socket.id]) {
            const gameId = players[socket.id].gameId;
            const game = games[gameId];
            const playersToRemoveIds = game.players.map(function (player) {
                return player.socketId;
            })
            clearInterval(game.gameInterval);
            delete games[gameId];
            playersToRemoveIds.forEach(function (playerToRemove) {
                delete players[playerToRemove];
            })
            io.to(gameId).emit('game-over', 'player-disconnected');
            io.to('menu').emit('remove-game-from-list', gameId);
        }
    });

    socket.on('disconnect', function () {
        console.log('[USER DISCONNECTED]' + socket.id);
        if (players[socket.id]) {
            const gameId = players[socket.id].gameId;
            const game = games[gameId];
            const playersToRemoveIds = game.players.map(function (player) {
                return player.socketId;
            })
            clearInterval(game.gameInterval);
            delete games[gameId];
            playersToRemoveIds.forEach(function (playerToRemove) {
                delete players[playerToRemove];
            })
            io.to(gameId).emit('game-over', 'player-disconnected');
            io.to('menu').emit('remove-game-from-list', gameId);
        }
    });

});

function gameLoop(roomId) {
    const game = games[roomId];
    if (game) {
        game.update();

        if (game.over) {
            const playersToRemoveIds = game.players.map(function (player) {
                return player.socketId;
            })
            clearInterval(game.gameInterval);
            delete games[roomId];
            playersToRemoveIds.forEach(function (playerToRemove) {
                delete players[playerToRemove];
            })
            io.to(roomId).emit('game-over', game.winner + '-won');
            io.to('menu').emit('remove-game-from-list', roomId);
        } else {

            const objectsForDraw = [];
            game.players.forEach(function (player) {
                objectsForDraw.push(player.forDraw());
            })
            game.diamonds.forEach(function (diamond) {
                objectsForDraw.push(diamond.forDraw());
            })
            game.bullets.forEach(function (bullet) {
                objectsForDraw.push(bullet.forDraw());
            })
            const data = {
                objectsForDraw: objectsForDraw,
                gameInProgress: game.players.length == 2,
                game: game
            }
            if (data.gameInProgress) {
                data.score = {
                    'space-ranger': game.players[0].score,
                    'pink-lady': game.players[1].score
                }
            }
            io.to(roomId).emit('game-loop', data);
        }

    }
}

const games = {};
const players = {};
const bullets = {};

module.exports.gameLoop = gameLoop;
module.exports.games = games;