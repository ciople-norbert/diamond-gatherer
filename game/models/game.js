const server = require('../server');
const Diamond = require('./diamond');
const SpaceRanger = require('./space_ranger');

class Game {
    constructor(options) {
        this.id = options.id;
        this.players = options.players;
        this.name = options.name;
        this.diamonds = [];
        this.bullets = [];
        this.totalDiamonds = 3;
        this.over = false;
        this.start();
    }

    start() {
        const that = this;
        this.gameInterval = setInterval(function () {
            server.gameLoop(that.id)
        },
            1000 / 60
        );
    }

    update() {
        if (this.inProgress() && this.players[0].score + this.players[1].score === this.totalDiamonds) {
            this.over = true;
            this.winner = this.players[0].score > this.players[1].score ? 'space-ranger' : 'pink-lady';
            return;
        }
        this.players.forEach(function (player) {
            player.update();
        });
        this.bullets.forEach((bullet, index) => {
            if (bullet.distance <= 0) {
                bullet.player.hasActiveBullet = false;
                delete this.bullets[index];
            }
            bullet.update();
        })
    }

    generateDiamonds() {
        var i = 0
        while (i < this.totalDiamonds) {
            let diamond = new Diamond();
            if (!(diamond.collisionWith(this.players[0].base) || diamond.collisionWith(this.players[1].base))) {
                this.diamonds.push(diamond);
                i++;
            }
        }
    }

    inProgress() {
        return this.players.length == 2;
    }
}

module.exports = Game;