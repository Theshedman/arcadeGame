// Enemy constructor
var Enemy = function (x, y, speed) {
    this.x = x;
    this.y = y + 60;
    this.move = 101;
    this.speed = speed;
    this.resetMove = -this.move;
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
    this.x = this.posX
    this.y = this.posY;
    this.sprite = 'images/char-boy.png';
    this.win = false; // check game win
    this.count = 0; // level counter
}

// Add render method to the player constructor
Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y)
}

// Add handleInput method to the player constructor
Player.prototype.handleInput = function (input) {
    if ((input === 'up' || input === 'K') && this.y > 0) {
        this.y -= this.moveVertical;
    } else if ((input === 'left' || input === 'H') && this.x > 0) {
        this.x -= this.moveHorizontal;
    } else if ((input === 'down' || input === 'J') && this.y < this.moveVertical * 4) {
        this.y += this.moveVertical;
    } else if ((input === 'right' || input === 'L') && this.x < this.moveHorizontal * 4) {
        this.x += this.moveHorizontal;
    }
}

//added update method to the player object
Player.prototype.update = function () {
    // loop through all the enemies and check for collision and win
    for (enemy of allEnemies) {
        // Collision check here
        if ((this.y === enemy.y) && ((enemy.x + enemy.move / 2 > this.x) && (enemy.x < this.x + this.moveHorizontal / 2))) {
            this.reset();
        }
    }

    // Check win and Reset player
    if (this.y === -23) {
        this.win = true;
        this.count++;
        this.y = this.posY;
        console.log(this.win);

        // New levels, alter enemies and their speed
        updateLevel();
    }
}

window.addEventListener('DOMContentLoaded', function () {
    console.log(player.y)
})

Player.prototype.reset = function () {
    // set the Player x and y to initial x and y
    this.x = this.posX;
    this.y = this.posY;
}

// Creating an instance of the Player object
const player = new Player();
// creating an array of the enemy object
const allEnemies = [];
// Creating instances of the enemy object
// let enemy1,
//     enemy2,
//     enemy3,
//     enemy4,
//     enemy5,
//     enemy6,
//     enemy7,
//     enemy8,
//     enemy9;
let enemy;

enemy = new Enemy(-101, (83 * 0), 135);
allEnemies.push(enemy);
enemy = new Enemy(-101, 83, 120);
allEnemies.push(enemy);
enemy = new Enemy(-101, (83 * 0), 200);
allEnemies.push(enemy);
enemy = new Enemy(-101, (83 * 2), 170);
allEnemies.push(enemy);
// allEnemies.push(enemy1, enemy2, enemy3, enemy4);

// Create more enemies on new Levels
function updateLevel() {
    switch (player.count) {
        // Level 2
        case 5:
            enemy = new Enemy(-101, 83, 85);
            allEnemies.push(enemy);
            break;

            // Level 3
        case 9:
            enemy = new Enemy(-101, (83 * 2), 105);
            allEnemies.push(enemy);
            break;

            // Level 4
        case 12:
            enemy = new Enemy(-101, (83 * 0), 125);
            allEnemies.push(enemy);
            break;

            // Level 5
        case 15:
            enemy = new Enemy(-101,( 83 * 2), 195);
            allEnemies.push(enemy);
            break;

            // Level 6
        case 18:
            enemy = new Enemy(-101, (83 * 2), 315);
            allEnemies.push(enemy);
            break;

            // Level 7
        case 21:
        console.log("case 21");
            enemy = new Enemy(-101, 83, 405);
            allEnemies.push(enemy);
    }
}

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        // Arrow keys
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        // Vim movement keys (H,J, K, L)
        72: 'H',
        74: 'J',
        75: 'K',
        76: 'L'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});