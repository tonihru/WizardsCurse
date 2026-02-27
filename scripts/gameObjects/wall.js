import { global } from "../modules/global.js";
import { BaseGameObject } from "./baseGameObject.js";

class Wall extends BaseGameObject {

    name = "Wall";

    constructor(x, y, width, height) {
        super(x, y, width, height);
        this.loadImages(["./images/TreeMine.png"])
    }

}
export { Wall }