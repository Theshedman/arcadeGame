// Enemies our player must avoid
var Enemy = function (x, y, speed) {
    this.x = x;
    this.y = y + 60;
    this.move = 101;
    this.speed = speed;
    this.resetMove = -this.move;
    this.boundary = this.move * 5;
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    if (this.x < this.move * 5) {
        // increment the enemies speed by speed * dt
        this.x += this.speed * dt;
    } else {
        //reset the enemies movement to the initial position
        this.x = this.resetMove;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// The player constructor
function Player() {
    this.moveVertical = 83;
    this.moveHorizontal = 101;
    this.posX = this.moveHorizontal * 2;
    this.posY = (this.moveVertical * 4) + 60;
    this.x = this.posX;
    this.y = this.posY;
    this.sprite = 'images/char-boy.png';
}

// Add render method to the player constructor
Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y)
}

// Add handleInput method to the player constructor
Player.prototype.handleInput = function (input) {
    if (input === 'up' && this.y > this.moveVertical) {
        this.y -= this.moveVertical;
    } else if (input === 'left' && this.x > 0) {
        this.x -= this.moveHorizontal;
    } else if (input === 'down' && this.y < this.moveVertical * 4) {
        this.y += this.moveVertical;
    } else if (input === 'right' && this.x < this.moveHorizontal * 4) {
        this.x += this.moveHorizontal;
    }
}

//added update method to the player object
Player.prototype.update = function () {
    // loop through all the enemies and check for collision
    for (enemy of allEnemies) {
        //console.log(enemy);
        if((this.y === enemy.y) && ((enemy.x + enemy.move/2 > this.x) && (enemy.x < this.x + this.moveHorizontal/2))) {
            this.reset();
        }
    }
}

Player.prototype.reset = function () {
    // set the Player x and y to initial x and y
    this.x = this.posX;
    this.y = this.posY;
}

// Creating an instance of the Player object
const player = new Player();
// Creating instances of the enemy object
const enemy1 = new Enemy((-101 * 2), 0, 150);
const enemy2 = new Enemy((-101), 83, 200);
const enemy3 = new Enemy((-101), 0, 250);
const enemy4 = new Enemy((-101), 83 * 2, 300);
const enemy5 = new Enemy((-101 * 3), 83, 200);
const enemy6 = new Enemy((-101), 83 * 2, 350);
const enemy7 = new Enemy((-101 * 2), 83 * 1, 400);
// creating an array of the enemy object
const allEnemies = [];
allEnemies.push(enemy1, enemy2, enemy3, enemy4, enemy5, enemy6, enemy7);

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