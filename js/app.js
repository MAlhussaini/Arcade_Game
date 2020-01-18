function win() {
    console.log("You won!")
    debugger 
}
function lose() {
    console.log("You lose!")
    debugger    
}
// Enemies our player must avoid
var Enemy = function (row) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    if (row === 0) {
        this.randomRow = true;
        this.row = Math.ceil(Math.random() * 3);
    }
    else {
        this.row = row;
        this.randomRow = false;
    }
    this.x = -202;
    this.y = -83 + 41.5 * 1 + (this.row * 83) + 15;
    this.speed = Math.ceil(Math.random() * 14);
    // this.speed = 0;
    console.log("row# " + this.row)
    console.log(this.speed);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += 50.5 * this.speed * dt;
    if (this.x > ctx.canvas.width) {
        this.x = -505;
        this.speed = Math.ceil(Math.random() * 14);
        if (this.randomRow) {
            this.row = Math.ceil(Math.random() * 3);
            this.y = -83 + 41.5 * 1 + (this.row * 83) + 15;
            console.log("row# " + this.row)
            console.log(this.speed);
        }
    }

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    if ((Math.abs(this.y - player.y) < 20) && (Math.abs(this.x - player.x) < 62)) {
        console.log("This y is "+this.y+", player y is "+player.y)
        console.log("This x is "+this.x+", player x is "+player.x)
        lose();
    }
    // console.log("This y is "+this.y+", player y is "+player.y)
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

class Player {
    constructor() {
        // x = -55, and y = -86 is the top left corner
        // the center of the top left corner x = 0, and y = -43
        // the multiplayer to go to the bottom corner x = 9, and y = 11
        // the center of the player is 
        this.x = -50.5 + 50.5 * 5;
        this.y = -83 + 41.5 * 11;
        this.sprite = "images/char-boy.png";
    }

    update() {

    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    handleInput(direction) {
        switch (direction) {
            case "left":
                if (this.x === 0) {
                    this.x = 404;
                    break;
                }
                this.x -= 101;
                break;
            case "right":
                if (this.x === 404) {
                    this.x = 0;
                    break;
                }
                this.x += 101;
                break;
            case "up":
                if (this.y === 41.5) {
                    this.x = 202;
                    this.y = 373.5;
                    console.log("You Won!")
                    break;
                }
                this.y -= 83;
                break;
            case "down":
                if (this.y === 373.5) {
                    break;
                }
                this.y += 83;
                break;
        }
        console.log(this.x)
        console.log(this.y)
    }
}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let player = new Player;
let enemy1 = new Enemy(1);
let enemy2 = new Enemy(2);
let enemy3 = new Enemy(3);
let enemy4 = new Enemy(0);
let enemy5 = new Enemy(0);
let allEnemies = [enemy1, enemy2, enemy3, enemy4, enemy5];
// let allEnemies = [enemy3];

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
