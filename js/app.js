var Furry = function() {
    this.x = 0;
    this.y = 0;
    this.direction = "right";
};

var Coin = function() {
    this.x = Math.floor(Math.random() * 10);
    this.y = Math.floor(Math.random() * 10);
};
var self;

var Game = function() {
    this.furry = new Furry();
    this.coin = new Coin();
    this.score = 0;
    this.board = document.querySelectorAll("#board div");
    self = this;

    this.index = function(x, y) {
        return x + y * 10;
    };

    this.showFurry = function() {
        this.board[this.index(this.furry.x, this.furry.y)].classList.add("furry");
    };

    this.hideVisibleFurry = function() {
        document.querySelector(".furry").classList.remove("furry");
    };

    this.showCoin = function() {
        this.board[this.index(this.coin.x, this.coin.y)].classList.add("coin");
    };

    this.moveFurry = function() {

        this.hideVisibleFurry();
        if (this.furry.direction === "right") {
            this.furry.x = this.furry.x + 1;
        } else if (this.furry.direction === "left") {
            this.furry.x = this.furry.x - 1;
        } else if (this.furry.direction === "up") {
            this.furry.y = this.furry.y - 1;
        } else if (this.furry.direction === "down") {
            this.furry.y = this.furry.y + 1;
        }
        this.showFurry();
        this.checkCoinCollision();
    };

    this.turnFurry = function(event) {
        switch (event.which) {
            case 37:
                self.furry.direction = "left";
                break;
            case 38:
                self.furry.direction = "up";
                break;
            case 39:
                self.furry.direction = "right";
                break;
            case 40:
                self.furry.direction = "down";
                break;
        }
    };

    this.checkCoinCollision = function() {
        if (this.coin.x === this.furry.x && this.coin.y === this.furry.y) {
            this.board[this.index(this.coin.x, this.coin.y)].classList.remove("coin");
            var scoreCounter = document.querySelector("#score strong");
            this.coin = new Coin();
            this.showCoin();
            this.score++;
            scoreCounter.innerHTML = this.score;
        }
    };

    this.gameOver = function() {
        if (this.furry.x > 9 || this.furry.x < 0 || this.furry.y > 9 || this.furry.y < 0){
           return document.querySelector('.invisible').classList.remove('invisible')
        }

    };

    this.startGame = function() {
        this.idSetInterval = setInterval(function() {
            self.moveFurry();
        }, 250);
    };
};

var game = new Game();
game.showFurry();
game.showCoin();
game.startGame();
document.addEventListener("keydown", function(event) {
    game.turnFurry(event);
});

