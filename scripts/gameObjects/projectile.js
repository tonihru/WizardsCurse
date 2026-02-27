import { global } from "../modules/global.js";
import { BaseGameObject } from "../gameObjects/baseGameObject.js";

class Projectile extends BaseGameObject {
    name = "Projectile"
    xVelocity = 0
    yVelocity = 0
    //facingDirection = ""

    update = function () { 
        //Update function to tell the projectile to go in a certain direction
        this.x += this.xVelocity * global.deltaTime;
        this.y += this.yVelocity * global.deltaTime;
    };

    reactToCollision = function(collidingObject) {
        switch (collidingObject.name) {
            case "Wall":
                this.active = "false"
                break;
            case "Enemy":
                this.active = "false"
        }
    }

    //shooting the projectile based on facingDirection of the player
   shoot = function () {
        console.log(global.playerObject.facingDirection)
        switch (global.playerObject.facingDirection) {
            case "up":
                this.xVelocity = 0
                this.yVelocity = -400
                this.switchCurrentSprites(0, 2);
                break;
            case "down":
                this.xVelocity = 0
                this.yVelocity = 400
                this.switchCurrentSprites(6, 8);
                break;
            case "left": 
                this.xVelocity = -400
                this.yVelocity = 0
                this.switchCurrentSprites(3, 5);
                break;
            case "right":
                this.xVelocity = 400
                this.yVelocity = 0
                this.switchCurrentSprites(9, 11);
                break; 
            }
        
    }

    constructor(x, y, width, height, facingDirection) {
        super(x, y, width, height, facingDirection);
        this.loadImagesFromSpritesheet("../images/Waterprojectile.png", 3, 4); 
        this.shoot();
    }
}

export { Projectile }