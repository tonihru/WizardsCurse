import { global } from "../modules/global.js";
import { BaseGameObject } from "./baseGameObject.js";

class Player extends BaseGameObject {

    name = "Player";
    xVelocity = 0;
    yVelocity = 0;
    facingDirection = ""

    animationData = {
        "animationSprites": [],
        "timePerSprite": 0.08,
        "currentSpriteElapsedTime": 0,
        "firstSpriteIndex": 0,
        "lastSpriteIndex": 0,
        "currentSpriteIndex": 0
    };

    update = function() {
        this.x += this.xVelocity * global.deltaTime;
        this.y += this.yVelocity * global.deltaTime;

        if (this.xVelocity === 0 && this.yVelocity === 0) {
            // Switch to idle sprite (or standing sprite)
            global.playerObject.switchCurrentSprites(this.animationData.firstSpriteIndex, this.animationData.firstSpriteIndex);
        } else {
            // If moving, continue with the walking animation (you can define the walking animation logic here)
            // For example, switch to a walking sprite or animation sequence
            //global.playerObject.switchCurrentSprites(this.animationData.walkingSpriteIndex, this.animationData.walkingSpriteIndex);
        }

        //preventing the player going out of bounds
        if (this.x < 0) {
            this.x = 0;
            this.xVelocity = 0;
        } else if (this.x + this.width > canvas.width) {
            this.x = canvas.width - this.width;
            this.xVelocity = 0;
        }
    
        if (this.y < 0) {
            this.y = 0;
            this.yVelocity = 0;
        } else if (this.y + this.height > canvas.height) {
            this.y = canvas.height - this.height;
            this.yVelocity = 0;
        }

        this.getNextSprite();
    }

    reactToCollision = function(collidingObject) {
        switch (collidingObject.name) {
            case "Wall":
                this.xVelocity = 0;
                this.yVelocity = 0;
                this.x = this.previousX;
                this.y = this.previousY;
                break;
            case "Enemy":
                this.active = "false"
                break;
        }
        
    }

    constructor(x, y, width, height, facingDirection) {
        super(x, y, width, height, facingDirection)
        this.loadImagesFromSpritesheet("../images/SpriteSheetWizardDone.png", 6, 4)
        console.log(global.allGameObjects)
    }
}

export { Player }