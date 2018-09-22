// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// The player constructor
function Player() {
    this.moveVertical = 83;
    this.moveHorizontal = 101;
    this.posX = this.moveHorizontal * 2;
    this.posY = (this.moveVertical * 5) - 20;
    this.x = this.posX;
    this.y = this.posY;
    this.sprite = 'images/char-boy.png';
}

// Add render method to the player constructor
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y)
}

// Add handleInput method to the player constructor
Player.prototype.handleInput = function(input) {
    if(input === 'up' && this.y > this.moveVertical) {
        this.y -= this.moveVertical;
    }
    else if(input === 'left' && this.x > 0) {
        this.x -= this.moveHorizontal;
    }
    else if(input === 'down' && this.y < this.moveVertical * 4) {
        this.y += this.moveVertical;
    }
     else if(input === 'right' && this.x < this.moveHorizontal * 4) {
         this.x += this.moveHorizontal;
     }
}

// Creating an instance of the Player object
const player = new Player();


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
