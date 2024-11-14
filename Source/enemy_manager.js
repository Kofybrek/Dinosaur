import * as gbl from "./global.js"
import Bird from "./bird.js"
import Cactus from "./cactus.js"

export default class EnemyManager
{
    constructor()
    {
        //We're storing the images in this class so our cacti and birds can use them to draw the sprites.
        this.bird_image = new Image();
        this.bird_image.src = "Resources/Images/Bird.png";
        this.birds = [];
        this.cacti = [];
        this.cactus_images = [new Image(), new Image()];
        this.cactus_images[0].src = "Resources/Images/Cactus0.png";
        this.cactus_images[1].src = "Resources/Images/Cactus1.png";

        this.enemy_timer = gbl.get_random(gbl.ENEMY_TIMER_MAX, gbl.ENEMY_TIMER_MIN);
    }

    draw(i_context)
    {
        for (let cactus of this.cacti)
        {
            cactus.draw(i_context, this.cactus_images);
        }

        for (let bird of this.birds)
        {
            bird.draw(i_context, this.bird_image);
        }
    }

    generate_cactus(i_length)
    {
        //We're generating a row of cacti so we need to offset the cacti coordinates.
        let cactus_offset = 0;

        for (let a = 0; a < i_length; a++)
        {
            let new_cactus = new Cactus(gbl.get_random(1, 0), cactus_offset);

            cactus_offset += new_cactus.sprite_width;

            //I hope we're not pushing the copy of the object otherwise I made a terrible mistake here.
            //Let's hope that new_cactus gets deleted after this.
            this.cacti.push(new_cactus);
        }
    }

    reset()
    {
        this.birds = [];
        this.cacti = [];
        this.enemy_timer = gbl.get_random(gbl.ENEMY_TIMER_MAX, gbl.ENEMY_TIMER_MIN);
    }

    update()
    {
        for (let bird of this.birds)
        {
            bird.update();
        }

        //Deleting the birds that flew past the dinosaur.
        this.birds = this.birds.filter((bird) => !bird.is_gone());

        for (let cactus of this.cacti)
        {
            cactus.update();
        }

        //Deleting the cacti that the dinosaur passed.
        this.cacti = this.cacti.filter((cactus) => !cactus.is_gone());

        if (0 === this.enemy_timer)
        {
            this.enemy_timer = gbl.get_random(gbl.ENEMY_TIMER_MAX, gbl.ENEMY_TIMER_MIN);

            if (0 === gbl.get_random(2, 0))
            {
                this.birds.push(new Bird());
            }
            else
            {
                this.generate_cactus(gbl.get_random(gbl.CACTUS_LENGTH_MAX, 1));
            }
        }
        else
        {
            this.enemy_timer--;
        }
    }
}