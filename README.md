# Classic Arcade Game Clone
Use the arrow keys to move your character around the game board. The object is to try to get your character safely to the water at the top of the board.


## Motivation
This game was built as part of the Grow With Google Front End Web Developer Nanodegree Scholarship. This is Project 3 in the course.
Coded from scratch using HTML, CSS & (Object-Oriented) Javascript.


## Getting Started
View the game here - [ Classic Arcade Game Clone](http://portfolio.threadkind.com/GWGND03-Classic-Arcade-Game-Clone/).


## How to Play
When you load the page there will be a panel on the page asking you to choose a character. All characters play the same way.
Included on this panel is also a link to the rules of the game, which you can view. This will pop up in a box over the character panel. Use the 'x' in the top right corner to close out the rules and return to the character panel.

Choose a player by clicking on one of the character images to view the full game board and start the game.

If you have played the game before on your device the high-score will load in the game stats panel at the top of the game board from local storage, along with the initials of the person who got the high score. Otherwise the highscore will just show '0000'.

You start the game with a score of 0 and 3 lives showing in the game stats panel at the top of the board. Your character starts the game in the bottom, middle block of the game board.

Gems are randomly generated into spots on the game board when the page is loaded. The orange gem will be somewhere on the first row of stone blocks, the green will be in the middle row and the blue will be on the top row of stone blocks. Collect the gems for extra points as follows:
* Blue Gem = 300 points
* Blue Gem = 200 points
* Blue Gem = 100 points
When a gem is collected the will be a sound and the gem will move from the game board

The ladybug enemys also get added to the game board when the page is loaded and they are assigned random speeds. There will be 2 enemies on each of the 3 stone rows, giving 6 enemies in total.

Use the arrow keys to move your character up, down, left and right.
For each row you climb on the game board you will earn 20 points. The game keeps track of the highest point you have reached on the game board and you only get another 20 points when you reach a higher row than previously reached.

Make sure to avoid the bugs as you move your character up the game board. If you do collide with a bug, a sound will play, your character will be reset back to the starting position and you will lose a life. The life bar at the top of the game board will decrease by one heart for each collision.

If you lose all of your lives in the game it is game over! A panel will show over the game board advsing you that the game is over and telling you to "Click to Play Again". If you clik the panel, the game will be reloaded and you can start the game again from the beginning. The score, lives and character will all reset.

If you make your way to the top of the game board and reach the water with at least 1 life left a panel will appear to tell you that you have won the game. It will show you your score for the game and give you a bonus of 500 points for each heart you have left in the life bar. It will also display the total score.
Just like the game over panel, the winner panel also has a section that you can click to play again. On this panel you must click on the "Click to Play Again" paragraph to reset the game rather than anywhere on the panel (as you are able to do on the 'Game Over' panel).

If there is no high score in local storage, or you have beaten the current high score, you will be prompted to type in your initials. Once you have typed 3 characters (or if you type less and press enter), the screen will show a message saying that the high score has been saved. This pushes your score to the local storage, which will be loaded in the game stat bar at the top of the game board next time you play.


## Dependancies
This game is written in HTML, CSS & (Object-Oriented) Javascript. No additional libraries/frameworks were used in its creation.

The game uses [Google Font: Press Start 2P](https://fonts.google.com/specimen/Press+Start+2P).

[Autoprefixer](https://autoprefixer.github.io/) was used to add prefixes to the CSS.


## Author
- Amy W
