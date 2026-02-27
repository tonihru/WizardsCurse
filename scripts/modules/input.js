import { Projectile } from "../gameObjects/projectile.js";
import { global } from "./global.js";

function move(event) {

    switch(event.key) {
        case "d":
            global.playerObject.xVelocity = 200;
            global.playerObject.yVelocity = 0;
            global.playerObject.switchCurrentSprites(6, 10);
            global.playerObject.facingDirection = "right";
            break;
        case "a":
            global.playerObject.xVelocity = -200;
            global.playerObject.yVelocity = 0;
            global.playerObject.switchCurrentSprites(0, 5);
            global.playerObject.facingDirection = "left";
            break;
        case "w":
            global.playerObject.xVelocity = 0;
            global.playerObject.yVelocity = -200;
            global.playerObject.switchCurrentSprites(11, 13);
            global.playerObject.facingDirection = "up";
            break;
        case "s":
            global.playerObject.xVelocity = 0;
            global.playerObject.yVelocity = 200;
            global.playerObject.switchCurrentSprites(14, 21);
            global.playerObject.facingDirection = "down";
            break;
        case "j":
            //generate a new projectile instance when "j" is pressed
            if(global.playerObject.active == true) {
            new Projectile (global.playerObject.x + 0.5 * global.playerObject.width, global.playerObject.y + 0.5 * global.playerObject.height, 48, 48);
            } 
            break;
    }
}


function stop() {
    //if you just want to move as long as the player presses a key
    global.playerObject.xVelocity = 0;
    global.playerObject.yVelocity = 0;
}

document.addEventListener("keydown", move);

//if you just want to move as long as the player presses a key:
document.addEventListener("keyup", stop);