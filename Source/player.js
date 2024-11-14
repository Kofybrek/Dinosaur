import * as gbl from "./global.js"

export default class Player
{
    constructor()
    {
        this.current_frame = 0;
        this.dead = 0;
        this.duck_pressed = 0;
        this.ducked = 0;
        this.image = new Image();
        this.image.src = "Resources/Images/Dinosaur.png";

        this.jump_pressed = 0;
        //This will be used to make the dinosaur jump higher the longer we press the jump button.
        this.jump_time = gbl.PLAYER_JUMP_TIME;
        this.on_ground = 1;
        this.speed_y = 0;
        this.y = gbl.GROUND_Y - gbl.PLAYER_HEIGHT;

        //For an easy language, Javascript sure is complex on input handling.
        window.addEventListener("keydown", this.key_down);
        window.addEventListener("keyup", this.key_up);
    }

    check_collision(i_birds, i_cacti)
    {
        for (let bird of i_birds)
        {
            //I should've just made a separate class for hitboxes.
            if (bird.x > gbl.PLAYER_X + 2 * gbl.COLLISION_ADJUSTMENT - gbl.BIRD_WIDTH &&
                bird.x < gbl.PLAYER_WIDTH + gbl.PLAYER_X - 2 * gbl.COLLISION_ADJUSTMENT &&
                bird.y > this.y + gbl.COLLISION_ADJUSTMENT * (2 + this.ducked) - gbl.BIRD_HEIGHT &&
                bird.y < gbl.PLAYER_HEIGHT + this.y + gbl.COLLISION_ADJUSTMENT * (this.ducked - 2))
            {
                this.dead = 1;

                return;
            }
        }

        for (let cactus of i_cacti)
        {
            if (cactus.x > gbl.PLAYER_X + gbl.COLLISION_ADJUSTMENT - cactus.sprite_width &&
                cactus.x < gbl.PLAYER_WIDTH - gbl.COLLISION_ADJUSTMENT + gbl.PLAYER_X &&
                cactus.y > this.y + gbl.COLLISION_ADJUSTMENT * (2 + cactus.size) - cactus.sprite_height &&
                cactus.y < gbl.PLAYER_HEIGHT + this.y - gbl.COLLISION_ADJUSTMENT * (2 + cactus.size))
            {
                this.dead = 1;

                return;
            }
        }
    }

    draw(i_context)
    {
        let sprite_x = 0;
        let sprite_y = 0;

        //Calculating the correct part of our spritesheet based on the player's state.
        if (1 === this.dead)
        {
            sprite_y = 3 * gbl.PLAYER_HEIGHT;
        }
        else if (1 === this.on_ground)
        {
            sprite_x = gbl.PLAYER_WIDTH * Math.floor(this.current_frame);

            if (1 === this.ducked)
            {
                sprite_y = gbl.PLAYER_HEIGHT;
            }
        }
        else
        {
            sprite_y = 2 * gbl.PLAYER_HEIGHT;

            if (0 < this.speed_y)
            {
                sprite_x = gbl.PLAYER_WIDTH;
            }
        }

        //We're also resizing the coordinates and the sprite.
        i_context.drawImage(this.image, sprite_x, sprite_y, gbl.PLAYER_WIDTH, gbl.PLAYER_HEIGHT, gbl.PLAYER_X * gbl.SCREEN_RESIZE, gbl.SCREEN_RESIZE * Math.floor(this.y), gbl.PLAYER_WIDTH * gbl.SCREEN_RESIZE, gbl.PLAYER_HEIGHT * gbl.SCREEN_RESIZE);
    }

    key_down = (i_event) =>
    {
        switch (i_event.code)
        {
            case "ArrowDown":
            {
                //Why not just update the player here instead of making separate variables for key pressing?
                //Because there's a small pause after the initial key press.
                this.duck_pressed = 1;

                break;
            }
            case "ArrowUp":
            case "Space":
            {
                this.jump_pressed = 1;

                break;
            }
        }
    }

    key_up = (i_event) =>
    {
        switch (i_event.code)
        {
            case "ArrowDown":
            {
                this.duck_pressed = 0;

                break;
            }
            case "ArrowUp":
            case "Space":
            {
                this.jump_pressed = 0;

                break;
            }
        }
    }

    reset()
    {
        this.current_frame = 0;
        this.dead = 0;
        this.ducked = 0;
        this.jump_time = gbl.PLAYER_JUMP_TIME;
        this.on_ground = 1;
        this.speed_y = 0;
        this.y = gbl.GROUND_Y - gbl.PLAYER_HEIGHT;
    }

    update()
    {
        if (1 === this.on_ground)
        {
            this.current_frame = (this.current_frame + gbl.PLAYER_ANIMATION_SPEED) % gbl.PLAYER_TOTAL_FRAMES;

            if (1 === this.jump_pressed)
            {
                this.ducked = 0;
                this.on_ground = 0;
                this.speed_y = gbl.PLAYER_JUMP_SPEED;
                this.y += this.speed_y;
            }
            else if (1 === this.duck_pressed)
            {
                this.ducked = 1;
            }
            else
            {
                this.ducked = 0;
            }
        }
        else
        {
            if (0 < this.jump_time)
            {
                if (0 === this.jump_pressed)
                {
                    this.jump_time = 0;

                    if (1 === this.duck_pressed)
                    {
                        this.speed_y = 0;
                    }
                }
                else
                {
                    this.jump_time--;
                }
            }
            else
            {
                //If the player is ducking while in the air, the dinosaur will go down faster.
                this.speed_y += gbl.GRAVITY * (1 + 3 * this.duck_pressed);
            }

            this.y += this.speed_y;

            if (0 <= this.speed_y && this.y >= gbl.GROUND_Y - gbl.PLAYER_HEIGHT)
            {
                this.jump_time = gbl.PLAYER_JUMP_TIME;
                this.on_ground = 1;
                this.speed_y = 0;
                this.y = gbl.GROUND_Y - gbl.PLAYER_HEIGHT;

                if (1 === this.duck_pressed)
                {
                    this.ducked = 1;
                }
            }
        }
    }
}