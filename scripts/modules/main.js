import { global } from "./global.js";
import { Player } from "../gameObjects/player.js"
import { Wall } from "../gameObjects/wall.js"
import { Enemy } from "../gameObjects/enemy.js";

// Grab references to views
const gameContainer = document.getElementById("gameContainer");
const gameOver = document.getElementById("gameOverScreen");
const tryAgainButton = document.getElementById("tryAgainButton"); //😀 Grab reference here to do it only once
const youWin = document.getElementById("winScreen"); 
const winButton = document.getElementById("winButton")

let gameLoopRunning = false; //😀 Flag to control the game loop.

function gameLoop(totalRunningTime) {
    if (!gameLoopRunning) return; //😀 Exit the loop if the flag is false.

    global.deltaTime = totalRunningTime - global.prevTotalRunningTime; // Time in milliseconds between frames
    global.deltaTime /= 1000; // Convert milliseconds to seconds for consistency in calculations
    global.prevTotalRunningTime = totalRunningTime; // Save the current state of "totalRunningTime", so at the next call of gameLoop (== next frame) to calculate deltaTime again for that next frame.
    global.ctx.clearRect(0, 0, global.canvas.width, global.canvas.height); // Completely clear the canvas for the next graphical output 


    for (var i = 0; i < global.allGameObjects.length; i++) { //loop in the (game)loop -> the gameloop is continous anyways.. and on every cylce we do now loop through all objects to execute several operations (functions) on each of them: update, draw, collision detection, ...
        if (global.allGameObjects[i].active == true) {
            
            global.allGameObjects[i].storePositionOfPreviousFrame();
            global.allGameObjects[i].update();
            global.checkCollisionWithAnyOther(global.allGameObjects[i]);
            global.allGameObjects[i].draw();
        }
    }
    
    //checks for game over
    if(global.playerObject.active == "false") {
        console.log("hallo???")
        showGameOverScreen();
    }

    //checks for win condition
    const allEnemiesInactive = global.allGameObjects
    .filter(obj => obj instanceof Enemy)
    .every(enemy => enemy.active === "false");

    if (allEnemiesInactive) {
    showWinScreen();
    }
    
    requestAnimationFrame(gameLoop); // This keeps the gameLoop running indefinitely
}


function setupGame() {
    global.allGameObjects = []; //😀 Reset game objects to prevent duplicates on replay.
    global.playerObject = null; //😀 Reset player object reference.
    // setup your game here - means: Create instances of the GameObjects that belong to your game.
    
    // map array
   let map = [
        [1, 1, 1, 1, 0, 0, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 0, 0, 1, 1, 1, 1],
    ];

    for (let i = 0; i < map.length; i++) {
        let innerArray = map[i];
        for (let j = 0; j < innerArray.length; j++) {
            if (innerArray[j] == 1) {
                new Wall(j * 100, i * 100, 100, 100);
            }
        }
    }

    global.playerObject = new Player (500, 500, 80, 80);
    
    //Enemy array, so enemies spawn only on specific points of the map
    let enemyMap = [
        [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
    ];

    for (let k = 0; k < map.length; k++){
        let innerArray = enemyMap[k];
        for (let l = 0; l < innerArray.length; l++) {
            if (innerArray[l] == 1) {
                new Enemy(l * 100, k * 100, 64, 64)
            }
        }
    }

}

function showStartScreen() {
    const startScreen = document.getElementById("startScreen");
    const startButton = document.getElementById("startButton");
 
    // Show the start screen initially
    startScreen.style.display = 'flex';
    gameContainer.style.display = 'none';

    // When the "Start Game" button is clicked
    startButton.addEventListener('click', () => {
        // Hide the start screen
        startScreen.style.display = 'none';
 
        // Show the game canvas
        gameContainer.style.display = 'block';
        
        // Set up and start the game
        setupGame();
        gameLoopRunning = true; //😀 Enable the game loop.
        requestAnimationFrame(gameLoop);
    });
};


function showGameOverScreen() {
    gameLoopRunning = false; //😀 Stop the game loop.

    //gameCanvas.style.display = 'none'
    gameContainer.style.display = 'none';
    gameOver.style.display = 'flex';
    
    tryAgainButton.onclick = () => {
        gameOver.style.display = 'none';
        gameContainer.style.display = 'block';
        setupGame();
        gameLoopRunning = true; //😀 Restart the game loop.
        global.prevTotalRunningTime = performance.now(); //😀 Reset timing to avoid jumpy animations.
        requestAnimationFrame(gameLoop);
    };
}

function showWinScreen () {
    gameLoopRunning = false; 

    //gameCanvas.style.display = 'none'
    gameContainer.style.display = 'none';
    youWin.style.display = 'flex';

    winButton.onclick = () => {

        youWin.style.display = 'none';
        gameContainer.style.display = 'block';
        setupGame();
        gameLoopRunning = true; 
        global.prevTotalRunningTime = performance.now();
        requestAnimationFrame(gameLoop);
    };
}

/* this is a fix that makes your game still runable after you left the tab/browser for some time: */
document.addEventListener("visibilitychange", () => {
    if (!document.hidden) {
        global.deltaTime = performance.now();
    };
});
 
// Show the start screen when the page loads
document.addEventListener("DOMContentLoaded", showStartScreen);
// document.addEventListener("DOMContentLoaded", showGameOverScreen);       // 😀 Remove this so we start not with game over


