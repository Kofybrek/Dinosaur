import * as gbl from "./global.js"

export default class Cactus
{
    constructor(i_size, i_x_offset)
    {
        //this.size = 0 = Small cactus
        //this.size = 1 = Big cactus
        this.size = i_size;
        this.x = gbl.SCREEN_WIDTH + i_x_offset;

        if (0 === this.size)
        {
            this.sprite_height = gbl.CACTUS_SMALL_HEIGHT;
            this.sprite_width = gbl.CACTUS_SMALL_WIDTH;
            //I drew 2 versions for each cactus size to make them look better.
            this.sprite_x = gbl.CACTUS_SMALL_WIDTH * Math.floor(2 * Math.random());
            this.y = gbl.GROUND_Y - gbl.CACTUS_SMALL_HEIGHT;
        }
        else
        {
            this.sprite_height = gbl.CACTUS_BIG_HEIGHT;
            this.sprite_width = gbl.CACTUS_BIG_WIDTH;
            this.sprite_x = gbl.CACTUS_BIG_WIDTH * Math.floor(2 * Math.random());
            this.y = gbl.GROUND_Y - gbl.CACTUS_BIG_HEIGHT;
        }
    }

    draw(i_context, i_images)
    {
        //We're getting the part of our spritesheet based on the cactus size.
        //We're also resizing the coordinates and the sprite.
        i_context.drawImage(i_images[this.size], this.sprite_x, 0, this.sprite_width, this.sprite_height, gbl.SCREEN_RESIZE * this.x, gbl.SCREEN_RESIZE * this.y, gbl.SCREEN_RESIZE * this.sprite_width, gbl.SCREEN_RESIZE * this.sprite_height);
    }

    is_gone()
    {
        //This is used to delete the cacti that are outside the screen.
        return this.x <= -this.sprite_width;
    }

    update()
    {
        this.x -= gbl.PLAYER_SPEED;
    }
}