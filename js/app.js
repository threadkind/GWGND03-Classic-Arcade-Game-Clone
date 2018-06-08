// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables to create enemy bug
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
    };

// Prototypes for Enemy
Enemy.prototype = {
    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update : function(dt) {
    // You should multiply any movement by the dt parameter which will ensure the game runs at the same speed for all computers.
    this.x += dt * this.speed;

    // Reset enemy if necessary
    this.resetEnemy();
    // Check for a collision with the player
    this.checkForCollision();
    },
    // Reset enemy back to start position
    resetEnemy : function(){
        // When the ememy gets to the end of the screen reset back to the beginning
        if (this.x > 505) {
        this.x = -100;
        }
    },
    // Check the x position of the enemy and the player...
    checkPositionX : function(playerX, xLessThan, xGreaterThan) {
        if (player.x === playerX && this.x < xLessThan && this.x > xGreaterThan){
            // If the player and the bug collide, reset the player and lose a life
            player.resetPlayer();
            player.loseLife();
        };
    },
    checkForCollision : function() {
    // If the enemy is on the same line as the player...
        if(this.y === player.y){
            // Check if the player is in the same column also using checkPositionX
            for(let i = 0; i <= 4; i++){
                const x100 = i *100
                this.checkPositionX(x100, x100+50, x100-50 );
            }
        };
    },
    // Draw the enemy on the screen, required method for game
    render: function() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}; // End of Enemy prototype

// Player class with variables to create player
var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.x = 200;
    this.y = 380;
    this.highestPoint = 380;
    this.lives = 3;
    this.heartBonus = this.lives * 500;
};

//Prototypes for Player
Player.prototype = {
    // Update the players's position, required method for game
    update : function() {
    },
    // Draw player
    render : function() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    },
    // Move the player when the arrow keys are pressed - also check to make sure player cannot move outside of the game board
    handleInput: function(key) {
        var panelsAreClosed = gameBoard.allPanelsClosed();

        // Make sure all panels are closed before moving player
        if (panelsAreClosed) {
            if(key === 'left' && this.x > 0){
                this.x -= 100;
            };
            if(key === 'right' && this.x < 400){
                this.x += 100;
            };
            if(key === 'up' && this.y > -20){
                this.y -= 80;
                // Check to see if this is the highest point the player has reached this life
                this.highPointIncrease();
                // Check to see if player has got to the water and won the game
                this.win();
            };
            if(key === 'down' && this.y < 380){
                this.y += 80;
            };

            // Check to see if any gems need to be collected on the position the player has moved to
            for (let i = 0; i < gems.length; i++){
                gems[i].collect();
            };
        };
    },
    // Check for highest point reached by player on board and if player is now at higher point than previously, increase score by 20 points
    highPointIncrease : function() {
        if(this.highestPoint > this.y){
            this.highestPoint = this.y;
            gameBoard.updateScore(20);
        }
    },
    // Check if player has won game, if so: resetPlayer and show winner panel
    win : function() {
        if(this.y === -20) {
            this.resetPlayer();
            gameBoard.winner();
        }
    },
    // Reset player back to start
    resetPlayer : function() {
    this.x = 200;
    this.y = 380;
    this.highestPoint = 380;
    },
    // Lose a heart and update hearts on board
    loseLife : function() {
        var lifeContainer = document.querySelector('#lives');

        this.lives -= 1;

        if(this.lives === 2) {
            lifeContainer.innerHTML = '<img src="images/Heart.png"><img src="images/Heart.png">';
            this.heartBonus = 1000;
            }
        if(this.lives === 1) {
            lifeContainer.innerHTML = '<img src="images/Heart.png">';
            this.heartBonus = 500;
        }
        if(this.lives === 0) {
            lifeContainer.innerHTML = '';
            this.heartBonus = 0;
            // If lives are at 0 then open the Game Over panel
            gameBoard.openPanel('.gameOver');
            }

        // Play impact sound when player collides with enemy and loses a heart
        document.querySelector('#impact').play();
        }
}; // End of Player prototype

// Gem class with variables to create gems on game board
var Gem =  function(x, y, color, scoreValue){
    this.sprite = `images/Gem-${color}.png`;
    this.x = x;
    this.y = y;
    this.scoreValue = scoreValue;
};

// Prototypes for Gem
Gem.prototype = {
    // Draw gems on the board
    render : function() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y, 60, 90);
    },
    // Collect gems on the board if player collides with them
    collect : function() {
        var checkX = false;
        var checkY = false;

        // Check if player and gems are on the same column
        // // Column 1
        if(this.x === 20 && player.x === 0) { checkX = true;}
        // Column 2
        if(this.x === 122 && player.x === 100) { checkX = true;}
        // Column 3
        if(this.x === 222 && player.x === 200) { checkX = true;}
        // Column 4
        if(this.x === 325 && player.x === 300) { checkX = true;}
        // Column 5
        if(this.x === 425 && player.x === 400) { checkX = true;}

        // Check if player and gems are on the same row
        // Row 1
        if(this.y === 280 && player.y === 220) { checkY = true;}
        // Row 2
        if(this.y === 200 && player.y === 140) { checkY = true;}
        // Row 3
        if(this.y === 115 && player.y === 60) { checkY = true;}


        // Check if both x + y are true
        if(checkX === true && checkY === true) {
            // If they are play gemCollect sound
            document.querySelector('#gemCollect').play();

            // Move the gem off screen
            this.x = -100;

            // Update the score for the value of the gem
            gameBoard.updateScore(this.scoreValue);
            }

        // Reset values of checkX and checkY
        checkX = false;
        checkY = false;
        }
}; // End of Gem prototype

// GameBoard class with variables to create gameboard data
var GameBoard = function() {
    this.highScore = localStorage.getItem('highScore');
    this.highScoreInitials = localStorage.getItem('highScoreInitials');
    this.score = 0;
};

GameBoard.prototype = {
    showHighScore : function() {
        if (this.highScore != null){
            if (this.highScoreInitials != null){
                document.querySelector('#highScore').innerText = `HI-SCORE: ${this.highScore} ${this.highScoreInitials}`;
            }
            else {
                document.querySelector('#highScore').innerText = `HI-SCORE: ${this.highScore}`;
            };
        };
    },
    updateScore : function(increase){
        this.score += increase;
        var scoreLength = String(score).length;

        if(scoreLength === 1){
            document.querySelector('#totalScore').innerHTML = `SCORE: 000${this.score}`;
        }
        else if(scoreLength === 2){
            document.querySelector('#totalScore').innerHTML = `SCORE: 00${this.score}`;
        }
        else if(scoreLength === 3){
            document.querySelector('#totalScore').innerHTML = `SCORE: 0${this.score}`;
        }
        else {
            document.querySelector('#totalScore').innerHTML = `SCORE: ${this.score}`;
        };
    },
    resetGame : function() {
    location.reload();
    },
    closePanel : function(element) {
        document.querySelector(element).classList.add('closed');
    },
    openPanel : function(element) {
        document.querySelector(element).classList.remove('closed')
    },
    winner : function(){
        var finalScore = gameBoard.score + player.heartBonus;
        var initials = "";

        // Open the panel that shows player won and game stats
        gameBoard.openPanel('.winner');

        // Add game data to panel
        document.querySelector('#finalStats').innerText = `Game Score: ${gameBoard.score}

        Heart Bonus
        ${player.lives} x 500: ${player.heartBonus}

        Total Score: ${finalScore}`;

        // If the local storage high score is null or if this games final score is more than the local store high score...
        if (this.highScore === null || finalScore > this.highScore) {

            // Display the panel to have player enter their initials
            gameBoard.openPanel('.winnerInitials');

            // Set the local storage with the new high score
            localStorage.setItem('highScore', finalScore);


            document.addEventListener('keyup', function(e){
                if(e.keyCode >= 37 && e.keyCode <= 40) {
                    player.resetPlayer();
                    if(e.keyCode === 38) {
                        gameBoard.updateScore (-20);
                    }
                }

                // If the length of the string of initals is less than 3 and the player presses a letter or number...
                if(initials.length < 3 && e.keyCode >= 48 && e.keyCode <= 90){
                    initials += e.key;

                    // Set the initials section on the panel to the digits entered and change them to uppercase
                    document.querySelector("#initials").innerText = initials.toUpperCase();
                }

                // If the length of the initial string is 3 then set the local storage initials to the string entered
                if(initials.length === 3){
                    localStorage.setItem('highScoreInitials', initials.toUpperCase());
                }
            });
        }
    },
    allPanelsClosed : function() {
        // Select all panels
        var panels = document.querySelectorAll('.panel');
        // Create empty array
        var panelClosed = [];
        // Check if all of the classlists contain 'closed' and push boolean to panelClosed array
        panels.forEach(function(element){
            panelClosed.push(element.classList.contains('closed'));
        });
        // Return true if all panels are closed and false if any are open
        return panelClosed.includes(false) === false;
    }
}; // End of GameBoard prototype

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

// var nodeListToArray = function(nodeList) {
//         var array = [];
//         for(var i = nodeList.length; i--;) {
//             array.unshift(nodeList[i]);
//         }
//         return array;
// }


var funcs = {
    // Function to generate a random number
    randomNum : function(Num) {
        return Math.floor(Math.random()*Num);
    }
}; // End of funcs object

var eventHandlers = {
    startGame : function() {
        // Check which character the player has chosen and store it in the player.sprite
        document.querySelector("#characters").addEventListener('click', function(e){
            if(e.target.id != "characters") {
            var chosenPlayer =  `images/${e.target.id}.png`;

            player.sprite = chosenPlayer;
            // Close the character panel
            gameBoard.closePanel('.gameStart');
            }
        });
    },
    gameOver : function() {
        document.querySelector('.gameOver').addEventListener('click', gameBoard.resetGame);
    },
    winner : function() {
        document.querySelector('.winner').addEventListener('click', gameBoard.resetGame);
    },
    rulesClose : function() {
        document.querySelector('#rulesClose').addEventListener('click', function(){
        gameBoard.closePanel('.rules');
        });
    },
    rulesClick : function() {
        document.querySelector('#rulesClick').addEventListener('click', function(){gameBoard.openPanel('.rules');
        });
    }
}; // End of event handlers object

// Create data for the game board
var gameBoard = new GameBoard();
gameBoard.showHighScore();

// Create a player
var player = new Player();

// Create enemies with randomly generated start points and randomly generated speeds
var enemy1 = new Enemy(funcs.randomNum(-500), 220, funcs.randomNum(400));
var enemy2 = new Enemy(funcs.randomNum(-500), 140, funcs.randomNum(400));
var enemy3 = new Enemy(funcs.randomNum(-500), 60, funcs.randomNum(400));
var enemy4 = new Enemy(funcs.randomNum(-500), 220, funcs.randomNum(400));
var enemy5 = new Enemy(funcs.randomNum(-500), 140, funcs.randomNum(400));
var enemy6 = new Enemy(funcs.randomNum(-500), 60, funcs.randomNum(400));

// Array to hold enemies
var allEnemies = [enemy1, enemy2, enemy3, enemy4, enemy5, enemy6];

// Possible x positions for gems
var gemX = [20, 122, 222, 325, 425];

// Create gems with randomly generated x positions - blue on the top line, green on the middle line and orange on the bottom line
var blueGem = new Gem(gemX[funcs.randomNum(5)], 115, 'Blue', 300);
var greenGem = new Gem(gemX[funcs.randomNum(5)], 200, 'Green', 200);
var orangeGem = new Gem(gemX[funcs.randomNum(5)], 280, 'Orange', 100);

// Array to hold gems
var gems = [blueGem, greenGem, orangeGem];


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

eventHandlers.startGame();
eventHandlers.gameOver();
eventHandlers.winner();
eventHandlers.rulesClose();
eventHandlers.rulesClick();










