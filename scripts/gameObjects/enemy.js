import { global } from "../modules/global.js";
import { BaseGameObject } from "./baseGameObject.js";

class Enemy extends BaseGameObject {
    name = "Enemy"
    xVelocity = 300
    yVelocity = 300

    animationData = {
        "animationSprites": [],
        "timePerSprite": 0.08,
        "currentSpriteElapsedTime": 0,
        "firstSpriteIndex": 0,
        "lastSpriteIndex": 2,
        "currentSpriteIndex": 0
    };
    
    update = function() {
        
        //random enemy movement
        this.randomMovementData.currentDirectionElapsedTime += global.deltaTime;

        if (this.randomMovementData.currentDirectionElapsedTime >= this.randomMovementData.timeToChangeDirection) {
            this.randomizeMovement();
            this.randomMovementData.currentDirectionElapsedTime = 0;
        }

        this.x += this.xVelocity * global.deltaTime;
        this.y += this.yVelocity * global.deltaTime;
        
        //movement along x-Axis
        if (this.x < 0) {
            this.x = 0;
            this.xVelocity = 0;
        } else if (this.x + this.width > canvas.width) {
            this.x = canvas.width - this.width;
            this.xVelocity = 200;
        }
        //movement along y-Axis
        if (this.y < 0) {
            this.y = 0;
            this.yVelocity = 0;
        } else if (this.y + this.height > canvas.height) {
            this.y = canvas.height - this.height;
            this.yVelocity = -200;
        }
    }

    randomMovementData = {
        "timeToChangeDirection": 0.2,
        "currentDirectionElapsedTime": 0,
        "movementChangePossibilityStartValue": 0.1,
        "movementChangePossibility": 0.5,
        "movementChangePossibilitySteps": 0.02,
        "movementChangeOppositePossibility": 0.3
    };

    
    
    randomizeMovement() {
        const shouldChange = Math.random();
        if (shouldChange <= this.randomMovementData.movementChangePossibility) {
            this.changeMovement();
            this.randomMovementData.movementChangePossibility = this.randomMovementData.movementChangePossibilityStartValue;
        } else {
            this.randomMovementData.movementChangePossibility += this.randomMovementData.movementChangePossibilitySteps;
            }
        }
    
    changeMovement() {
        const randomAxis = Math.random(); // Decide to move along X or Y
        const direction = Math.random() > 0.5 ? 1 : -1; // Random positive or negative direction
        
        if (randomAxis > 0.5) {
            this.xVelocity = 200 * direction; // Move along X-axis
            this.yVelocity = 0; // Stop Y-axis movement
        } else {
            this.yVelocity = 200 * direction; // Move along Y-axis
            this.xVelocity = 0; // Stop X-axis movement
        }
    }


    //simple collision detection
    reactToCollision = function(collidingObject) {
        switch (collidingObject.name) {
            case "Projectile":
                this.active = "false"
                console.log(`Bruda was los hier? Enemy at (${this.x}, ${this.y}) active: ${this.active}`);
                break;
            case "Wall":
                this.xVelocity = 0;
                this.yVelocity = 0;
                this.x = this.previousX;
                this.y = this.previousY;
                break;
        }
    }

    constructor(x, y, width, height) {
        super(x, y, width, height);
        this.loadImagesFromSpritesheet("./images/Enemies.png", 3, 1);
    }
}

export {Enemy}