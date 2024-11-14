import * as gbl from "./global.js"

//I can't spell "Ptreodtsractykdcbefjel" so it's a bird.
export default class Bird
{
    constructor()
    {
        this.current_frame = 0;
        this.x = gbl.SCREEN_WIDTH;
        this.y = gbl.get_random(gbl.BIRD_Y_MAX, gbl.BIRD_Y_MIN);
    }

    draw(i_context, i_image)
    {
        //We're getting the part of our spritesheet based on the current frame.
        //We're also resizing the coordinates and the sprite.
        i_context.drawImage(i_image, gbl.BIRD_WIDTH * Math.floor(this.current_frame), 0, gbl.BIRD_WIDTH, gbl.BIRD_HEIGHT, gbl.SCREEN_RESIZE * this.x, gbl.SCREEN_RESIZE * this.y, gbl.BIRD_WIDTH * gbl.SCREEN_RESIZE, gbl.BIRD_HEIGHT * gbl.SCREEN_RESIZE);
    }

    is_gone()
    {
        //This is used to delete the birds that are outside the screen.
        return this.x <= -gbl.BIRD_WIDTH;
    }

    update()
    {
        this.current_frame = (this.current_frame + gbl.BIRD_ANIMATION_SPEED) % gbl.BIRD_TOTAL_FRAMES;
        this.x -= gbl.BIRD_SPEED;
    }
}