// Initializing global variables.
const onScreenMoves = document.querySelector("#moves");
const onScreenTimer = document.querySelector("#play-time");
let timeCounter;
let movesCount = 0;
let seconds = 0, minutes = 0;
let playingTime = minutes + " m " + seconds + " s";

function gameOverPopup() {
    clearInterval(timeCounter);
    onScreenTimer.textContent = playingTime;
    onScreenMoves.textContent = movesCount;
    player.resetPosition()

    // Unhide the game popup.
    document.querySelector(".overlay").setAttribute("class", "overlay unhide");
}

function restartGame() {
    player.firstMove = true;
    movesCount = 0;
    playingTime = minutes + " m " + seconds + " s";
    player.resetPosition()

    // Hide the game popup.
    document.querySelector(".overlay").setAttribute("class", "overlay");
}

//  Timer function
function startTimer() {
    timeCounter = setInterval(function () {
        playingTime = minutes + " m " + seconds + " s";
        seconds++;
        if (seconds == 60) {
            minutes++;
            seconds = 0;
        }
    }, 1000);
}

function moveCounter() {
    movesCount += 1;
}
// Enemies our player must avoid
let Enemy = function (row) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    // If enemy row is Zero, give a random row between 1 to 3.
    if (row === 0) {
        // Giving the enemy new attribute of a randomness
        this.randomRowFlag = true;
        this.row = Math.ceil(Math.random() * 3);
    }
    else {
        this.row = row;
        this.randomRowFlag = false;
    }
    this.x = -202;
    // Extra calculation are for future development
    // 15 is an offset
    // 41.5 is half the hight of the game cube
    this.y = -83 + (41.5 * 1) + (this.row * 83) + 15;
    // Gives a random preset velocity from 1 to 14 to each enemy instance
    this.velocity = Math.ceil(Math.random() * 14);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += 50.5 * this.velocity * dt;

    /* 
    * Restarts enemy position to left of screen with -505 offset, 
    * if enemy reach the end of the canvas
    */
    if (this.x > ctx.canvas.width) {
        this.x = -505; // Gives an offset of -505 off the screen (Left)
        this.velocity = Math.ceil(Math.random() * 14); // Reset velocity
        // Reset the random row for flagged enemies
        if (this.randomRowFlag) {
            this.row = Math.ceil(Math.random() * 3);
            this.y = -83 + 41.5 * 1 + (this.row * 83) + 15;
        }
    }

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    // End the game if the player touches the enemy
    if ((Math.abs(this.y - player.y) < 20) && (Math.abs(this.x - player.x) < 62)) {
        console.log("This y is " + this.y + ", player y is " + player.y)
        console.log("This x is " + this.x + ", player x is " + player.x)
        gameOverPopup();
    }
    // Redraw the enemy position
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

class Player {
    constructor() {
        /** Game calibration
         * x = -55, and y = -86 is the top left corner
         * the center of the top left corner x = 0, and y = -43
         * the multiplayer to go to the bottom corner x = 9, and y = 11
         * the center of the player is x = 202, and y = 373.5
         */
        // Extra calculation are for future development
        // 41.5 is half the hight of the game cube
        // 50.5 is half the width of the game cube
        this.x = -50.5 + 50.5 * 5;
        this.y = -83 + 41.5 * 11;
        this.sprite = "images/char-boy.png";
        this.firstMove = true;
    }

    // Reset player position to the center of the bottom row
    resetPosition() {
        this.x = 202;
        this.y = 373.5;
    }
    update() {
        //never really used it!!
    }

    render() {
        // Redraws the player position
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    // Handel keyboard inputs
    handleInput(direction) {
        // Start timer if this is the first move ot the player
        if (this.firstMove) {
            startTimer();
            this.firstMove = false;
        }
        switch (direction) {
            case "left":
                if (this.x === 0) {
                    this.x = 404;
                    break;
                }
                this.x -= 101;
                moveCounter();
                break;
            case "right":
                if (this.x === 404) {
                    this.x = 0;
                    break;
                }
                this.x += 101;
                moveCounter();
                break;
            case "up":
                // End the game if the player reach the top
                if (this.y === 41.5) {
                    this.x = 202;
                    this.y = 373.5;
                    gameOverPopup();
                    break;
                }
                this.y -= 83;
                moveCounter();
                break;
            case "down":
                if (this.y === 373.5) {
                    break;
                }
                this.y += 83;
                moveCounter();
                break;
        }
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

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    let allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
