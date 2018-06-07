// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += dt * this.speed;

    if (this.x > 505) {
        this.x = -100;
    }
    if(this.y === player.y){
        if (player.x === 0 && this.x < 50 && this.x > -50){
            player.resetPlayer();
            player.loseLife();
        };
        if (player.x === 100 && this.x < 150 && this.x > 50){
            player.resetPlayer();
            player.loseLife();

        };
        if (player.x === 200 && this.x < 250 && this.x > 150){
            player.resetPlayer();
            player.loseLife();
        };
        if (player.x === 300 && this.x < 350 && this.x > 250){
            player.resetPlayer();
            player.loseLife();
        };
        if (player.x === 400 && this.x < 450 && this.x > 350){
            player.resetPlayer();
            player.loseLife();
        };
    };
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.x = 200;
    this.y = 380;
    this.highestPoint = 380;
    this.lives = 3;
}
Player.prototype.update = function() {
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
Player.prototype.handleInput = function(key) {
    if(key === 'left' && this.x > 0){
        this.x -= 100;
    }
    if(key === 'right' && this.x < 400){
        this.x += 100;
    }
    if(key === 'up' && this.y > -20){
        this.y -= 80;

        if(this.highestPoint > this.y){
            this.highestPoint = this.y;
            updateScore(20);
        }

    }
    if(key === 'down' && this.y < 380){
        this.y += 80;
    }
    if(this.y === -20) {
        this.resetPlayer();
        winner();
    }

    blueGem.collect();
    greenGem.collect();
    orangeGem.collect();


};

Player.prototype.resetPlayer = function() {
    this.x = 200;
    this.y = 380;
    this.highestPoint = 380;
};

Player.prototype.loseLife = function() {
    var lifeContainer = document.querySelector('#lives');

    this.lives -= 1;

    if(this.lives === 2) {
        lifeContainer.innerHTML = '<img src="images/Heart.png"><img src="images/Heart.png">';
    }
    if(this.lives === 1) {
        lifeContainer.innerHTML = '<img src="images/Heart.png">';

    }
    if(this.lives === 0) {
        lifeContainer.innerHTML = '';
        document.querySelector('.gameOver').style.display = "block"
    }
    document.querySelector('#impact').play();
};

var Gem =  function(x, y, color, scoreValue){
    this.sprite = `images/Gem-${color}.png`;
    this.x = x;
    this.y = y;
    this.scoreValue = scoreValue;
}
Gem.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y, 60, 90);
};
Gem.prototype.collect = function() {
    var checkX = false;
    var checkY = false;

    //square 1
    if(this.x === 20 && player.x === 0) { checkX = true;}
    //square 2
    if(this.x === 122 && player.x === 100) { checkX = true;}
    //square 3
    if(this.x === 222 && player.x === 200) { checkX = true;}
    //square 4
    if(this.x === 325 && player.x === 300) { checkX = true;}
    //square 5
    if(this.x === 425 && player.x === 400) { checkX = true;}

    //line 1
    if(this.y === 280 && player.y === 220) { checkY = true;}
    //line 2
    if(this.y === 200 && player.y === 140) { checkY = true;}
    //line 3
    if(this.y === 115 && player.y === 60) { checkY = true;}


    //check if both x + y are true
    if(checkX === true && checkY === true) {
        //play sound
        document.querySelector('#gemCollect').play();

        //move the gem off screen
        this.x = -100;
        //update the score for the value of the gem
        updateScore(this.scoreValue);
    }
    checkX = false;
    checkY = false;
}
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var highScore = localStorage.getItem('highScore');
var highScoreInitials = localStorage.getItem('highScoreInitials');

if (highScore != null){
    if (highScoreInitials != null){
        document.querySelector('#highScore').innerText = `HI-SCORE: ${highScore} ${highScoreInitials}`;
    }
    else {
        document.querySelector('#highScore').innerText = `HI-SCORE: ${highScore}`;
    }
}
var score = 0;

var line1 = 220;
var line2 = 140;
var line3 = 60;

var randomNum = function(Num){
    return Math.floor(Math.random()*Num);
}

var player = new Player();

var enemy1 = new Enemy(randomNum(-500), line1, randomNum(400));
var enemy2 = new Enemy(randomNum(-500), line2, randomNum(400));
var enemy3 = new Enemy(randomNum(-500), line3, randomNum(400));
var enemy4 = new Enemy(randomNum(-500), line1, randomNum(400));
var enemy5 = new Enemy(randomNum(-500), line2, randomNum(400));
var enemy6 = new Enemy(randomNum(-500), line3, randomNum(400));

var allEnemies = [enemy1, enemy2, enemy3, enemy4, enemy5, enemy6];

var gemX = [20, 122, 222, 325, 425];

var blueGem = new Gem(gemX[randomNum(5)], 115, 'Blue', 300);
var greenGem = new Gem(gemX[randomNum(5)], 200, 'Green', 200);
var orangeGem = new Gem(gemX[randomNum(5)], 280, 'Orange', 100);

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

document.querySelector("#characters").addEventListener('click', function(e){
    if(e.target.id != "characters") {
        var chosenPlayer =  `images/${e.target.id}.png`;

        player.sprite = chosenPlayer;

        document.querySelector('.gameStart').style.display = "none";
    }
});

var updateScore = function(increase){
    score += increase;
    var scoreLength = String(score).length;

    if(scoreLength === 1){
        document.querySelector('#totalScore').innerHTML = `SCORE: 000${score}`;
    }
    else if(scoreLength === 2){
        document.querySelector('#totalScore').innerHTML = `SCORE: 00${score}`;
    }
    else if(scoreLength === 3){
        document.querySelector('#totalScore').innerHTML = `SCORE: 0${score}`;
    }
    else {
        document.querySelector('#totalScore').innerHTML = `SCORE: ${score}`;
    }

}

var resetGame = function(){
    location.reload();
}

document.querySelector('.gameOver').addEventListener('click', resetGame);

document.querySelector('.winner').addEventListener('click', resetGame);

var winner = function(){
    const localScore = localStorage.getItem('highScore');
    var heartBonus = player.lives * 500;
    var finalScore = score + heartBonus;

    console.log(localScore, finalScore);

    var initials = "";

    document.querySelector('.winner').style.display = "block";

    document.querySelector('#finalStats').innerText = `Game Score: ${score}

    Heart Bonus
    ${player.lives} x 500: ${heartBonus}

    Total Score: ${finalScore}`;

    if (localScore === null || finalScore > localScore) {

        document.querySelector('#winnerInitials').style.display = "block";

        localStorage.setItem('highScore', finalScore);


        document.addEventListener('keyup', function(e){
            if(e.keyCode >= 37 && e.keyCode <= 40) {
                player.resetPlayer();
                if(e.keyCode === 38) {
                    updateScore (-20);
                }
            }
            if(initials.length < 3 && e.keyCode >= 48 && e.keyCode <= 90){
            initials += e.key;
            document.querySelector("#initials").innerText = initials.toUpperCase();
            }
            if(initials.length === 3){
                localStorage.setItem('highScoreInitials', initials.toUpperCase());
            }
            console.log(e.key, initials, initials.length);

    });
    }


}


