import * as gbl from "./global.js"

export default class Ground
{
    constructor()
    {
        this.image = new Image();
        this.image.src = "Resources/Images/Ground.png";

        this.x = 0;
    }

    draw(i_context)
    {
        //Yes, we're drawing 2 images right next to each other to make the illusion that our ground is infinite.
        //Come to think of it, I should've just changed the image instead of this.
        //Or maybe this is better.
        //Or maybe I'm just stupid.
        i_context.drawImage(this.image, gbl.SCREEN_RESIZE * this.x, gbl.SCREEN_RESIZE * (gbl.GROUND_Y - gbl.GROUND_OFFSET), 2 * gbl.SCREEN_RESIZE * gbl.SCREEN_WIDTH, 2 * gbl.SCREEN_RESIZE * (gbl.SCREEN_HEIGHT - gbl.GROUND_Y));
        i_context.drawImage(this.image, gbl.SCREEN_RESIZE * (2 * gbl.SCREEN_WIDTH + this.x), gbl.SCREEN_RESIZE * (gbl.GROUND_Y - gbl.GROUND_OFFSET), 2 * gbl.SCREEN_RESIZE * gbl.SCREEN_WIDTH, 2 * gbl.SCREEN_RESIZE * (gbl.SCREEN_HEIGHT - gbl.GROUND_Y));
    }

    reset()
    {
        this.x = 0;
    }

    update()
    {
        this.x = (this.x - gbl.PLAYER_SPEED) % (2 * gbl.SCREEN_WIDTH);
    }
}