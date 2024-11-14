import * as gbl from "./global.js"
import EnemyManager from "./enemy_manager.js"
import Ground from "./ground.js"
import Player from "./player.js"

function draw_number(i_number, i_x, i_y)
{
    let text_x = i_x;

    //We're diving our number into digits.
    for (let digit of String(i_number))
    {
        //Then we're multiplying each digit by the font size to get the correct digit sprite.
        context.drawImage(font_image, gbl.FONT_SIZE * digit, 0, gbl.FONT_SIZE, gbl.FONT_SIZE, gbl.SCREEN_RESIZE * text_x, gbl.SCREEN_RESIZE * i_y, gbl.FONT_SIZE * gbl.SCREEN_RESIZE, gbl.FONT_SIZE * gbl.SCREEN_RESIZE);

        text_x += gbl.FONT_SIZE;
    }
}

function game_draw()
{
    //I don't think we need to clear the screen since we're drawing a background that's covering it completely.
    context.fillStyle = "#00ffff";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.drawImage(background_image, 0, 0, gbl.SCREEN_RESIZE * gbl.SCREEN_WIDTH, gbl.SCREEN_HEIGHT * gbl.SCREEN_RESIZE);

    enemy_manager.draw(context);
    player.draw(context);
    ground.draw(context);

    context.drawImage(font_image, 0, gbl.FONT_SIZE, 6 * gbl.FONT_SIZE, 2 * gbl.FONT_SIZE, gbl.SCORE_X * gbl.SCREEN_RESIZE, gbl.SCORE_Y * gbl.SCREEN_RESIZE, 6 * gbl.FONT_SIZE * gbl.SCREEN_RESIZE, 2 * gbl.FONT_SIZE * gbl.SCREEN_RESIZE);

    draw_number(Math.floor(0.25 * current_score), gbl.SCORE_X + 6 * gbl.FONT_SIZE, gbl.SCORE_Y);
    draw_number(Math.floor(0.25 * high_score), gbl.SCORE_X + 6 * gbl.FONT_SIZE, gbl.FONT_SIZE + gbl.SCORE_Y);
}

function game_loop(i_current_time)
{
    //Making the game framerate-independent.
    let delta_time = i_current_time - previous_time;

    lag += delta_time;
    previous_time += delta_time;

    while (gbl.SCREEN_FRAMERATE <= lag)
    {
        lag -= gbl.SCREEN_FRAMERATE;

        game_update();

        if (gbl.SCREEN_FRAMERATE > lag)
        {
            game_draw();
        }
    }

    requestAnimationFrame(game_loop);
}

function game_update()
{
    if (0 === player.dead)
    {
        current_score++;

        if (current_score > high_score)
        {
            high_score = current_score;
        }

        enemy_manager.update();
        ground.update();
        player.update();
        player.check_collision(enemy_manager.birds, enemy_manager.cacti);
    }
    else if (1 === restart_pressed)
    {
        current_score = 0;

        enemy_manager.reset();
        ground.reset();
        player.reset();
    }
}

function key_down(i_event)
{
    switch (i_event.code)
    {
        case "Enter":
        {
            restart_pressed = 1;

            break;
        }
    }
}

function key_up(i_event)
{
    switch (i_event.code)
    {
        case "Enter":
        {
            restart_pressed = 0;

            break;
        }
    }
}

let background_image = new Image();
background_image.src = "Resources/Images/Background.png";

let canvas = document.getElementById("canvas");
canvas.height = gbl.SCREEN_HEIGHT * gbl.SCREEN_RESIZE;
canvas.width = gbl.SCREEN_RESIZE * gbl.SCREEN_WIDTH;

let context = canvas.getContext("2d");
//This will stop the browser from smoothing our images since we're pixel-arting (Idc if it's not a word).
context.imageSmoothingEnabled = 0

let current_score = 0;
let enemy_manager = new EnemyManager();
let font_image = new Image();
font_image.src = "Resources/Images/Font.png";

let ground = new Ground();
let high_score = 0;
let lag = 0;
let player = new Player();
let previous_time = 0;
let restart_pressed = 0;

window.addEventListener("keydown", key_down);
window.addEventListener("keyup", key_up);

requestAnimationFrame(game_loop);