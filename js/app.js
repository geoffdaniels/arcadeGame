// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    //DETERMINES LOCATION AND SPEED
    this.x = x;
    this.y = y;
    this.speed = speed;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};
//SET LEVEL FOR GAME START
let floor = document.getElementById('level-number')
let level = 1;
let skips = document.querySelector('.moves')
let moves = 0;
let stars = document.querySelectorAll('.stars li')
let modal = document.querySelector('.modal-box');
let message = document.querySelector('.message');
let close = document.querySelector('.close')
let finalMoves = document.querySelector('.final-moves');
let finalStars = document.querySelector('.final-stars');
let replayButton = document.querySelector('.replay');
let finalSkips = 0;
let person = 'images/char-boy.png';
let characters = document.querySelector('.characters')

characters.addEventListener('click', charSelect)

function resetBoard(e) {
  modal.classList.add('hidden');
  modalUp = false;
  level = 1;
  moves = 0;
  skips.innerHTML = moves;
  floor.innerHTML = level;
  resetStar();
}

close.addEventListener('click', resetBoard)

replayButton.addEventListener('click', resetBoard)


// Parameter: dt, a time delta between ticks
// Update the enemy's position, required method for game
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    //MULTIPLIES THE SPEED BY DT FOR X
    this.x += this.speed * dt;

    //RENDER ENEMIES RANDOMLY ONCE OFF SCREEN
    if(level == 1) {
    if(this.x > 515) {
      this.x = -100;
      this.speed = 100 + Math.floor(Math.random() *50);
    }};
    if(level == 2) {
    if(this.x > 515) {
      this.x = -100;
      this.speed = 100 + Math.floor(Math.random() *150);
    }};
    if(level == 3) {
    if(this.x > 515) {
      this.x = -100;
      this.speed = 100 + Math.floor(Math.random() *250);
    }};
    if(level >= 4) {
    if(this.x > 515) {
      this.x = -100;
      this.speed = 100 + Math.floor(Math.random() *500);
    }};

    //COLLISION CHECK BETWEEN ENEMIES AND PLAYER
    if(player.x < this.x +75 && player.x +75 > this.x && player.y < this.y +60 && player.y +60 > this.y) {
      player.x = 202;
      player.y = 405;
    };
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// Now write your own player class
function Player(x,y) {
  //LOCATION VARIABLES FOR LOAD
  this.x = playerX;
  this.y = playerY;
  //CHARACTER IMAGE - BOY RIGHT NOW; FUTURE ATTEMPT TO SELECT CHARACTER
  this.sprite = person;
};

//SELECT CHARACTER ICON - HAD TO LOAD ALL OTHER CHARACTERS IN ENGINE TO DO THIS
function charSelect(i) {
  player.sprite = 'images/'+i.target.src.split('/').pop();
}



// This class requires an update(), render() and
// a handleInput() method.
Player.prototype.update = function(dt) {
  //CHANGES LEVELS AND PROVIDES WINNING ALERT
  if(this.y < 0) {
    increaseLevel();
    if(level == 5) {
    won();
    }
  }
};


Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(keyPress) {
//MOVE LEFT BUT NOT OFF BOARD
  if(keyPress == 'left' && this.x > 0) {
    this.x -= 102;
    moveCounter();
  };
  //MOVE RIGHT BUT NOT OFF BOARD
  if(keyPress == 'right' && this.x < 400) {
    this.x += 102;
    moveCounter();
  };
  //MOVE UP BUT NOT OFF BOARD
  if(keyPress == 'up' && this.y > 0) {
    this.y -= 83;
    moveCounter();

  };
  //MOVE DOWN BUT NOT OFF BOARD
  if(keyPress == 'down' && this.y < 400) {
    this.y += 83;
    moveCounter();
  };
  //ONCE TO TOP OF BOARD RESET TO INITIAL POSITION
  if(this.y < 0 && level <5) {
    setTimeout(() => {
      this.x = 202;
      this.y = 405;
    }, 120);
    level++;
    // moveCounter();
  };

}

    //***FUNCTIONS***//


//LEVEL AND MOVE COUNTER FUNCTIONS
function increaseLevel() {
  floor.innerHTML = level;
}
function moveCounter() {
  moves++;
  skips.innerHTML = moves;
  starCount();
}


//STAR COUNTER AND HIDE STAR FUNCTIONS
function starCount() {
  if (moves == 22 || moves == 27 || moves == 32) {
    hideStar();
  }
}

function hideStar() {
  for(star of stars) {
    if(star.style.display !== 'none') {
      star.style.display = 'none';
      break;
    }
  };
};

//FUNCTION TO DISPLAY WINNING MODAL BOX
function won() {
  modal.classList.remove('hidden');
  finalSkips = moves;
  // console.log(finalMoves);
  // level = 1;
  // moves = 0;
  skips.innerHTML = moves;
  modalUp = true;
  displayFinished();
  // resetStar();
}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
let allEnemies = [];

//ENEMY LOCAITONS
let enemyLocation = [63,147,230]

// enemyLocation.forEach(function(locationY) {
//   enemy = new Enemy(0, locationY, 200);
//   allEnemies.push(enemy);
// });
//REWROTE ABOVE AS ARROW - EXTRA PRACTICE
enemyLocation.forEach(locationY => {
  enemy = new Enemy(0, locationY, 200);
  allEnemies.push(enemy);
});

// Place the player object in a variable called player
const playerX = 202;
const playerY = 405;
let player = new Player(playerX, playerY, person);


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.

//IDENTIFIES IF MODAL IS VISIBLE
let modalUp = false;

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    //ADDED IF STATEMENT TO CHECK FOR MODAL UP - IF UP, THEN KEY PRESS NOT PERMITTED
    //THIS PREVENTS GAME FROM RUNNING IN THE BACKGROUND WHILE MODAL UP
    if(!modalUp) {
    player.handleInput(allowedKeys[e.keyCode]);
  }
});

function getStars() {
  //SETTING VARIABLE FOR ARGUMENT
  let starRating = 0;
  //FOR LOOP TO CHECK FOR STYLE DISPLAYS NOT NONE AND TAKE COUNT
  for (star of stars) {
    if (star.style.display !== 'none') {
      starRating++;
    }
  }
  return starRating;
};

function resetStar() {
  stars.forEach(function(star) {
    star.style.display = '';
  });
};

function displayFinished() {
    // messageBoard(finished);
    writeModal();
    modal.classList.remove('hidden');
};

function writeModal() {
  finalMoves.innerHTML = finalSkips;
  finalStars.innerHTML = getStars();
}
