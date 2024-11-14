export const BIRD_ANIMATION_SPEED = 0.25;
export const BIRD_HEIGHT = 32;
export const BIRD_SPEED = 5;
export const BIRD_TOTAL_FRAMES = 8;
export const BIRD_WIDTH = 32;
export const BIRD_Y_MAX = 108;
export const BIRD_Y_MIN = 32;
export const CACTUS_BIG_HEIGHT = 64;
export const CACTUS_BIG_WIDTH = 32;
//Maximum number of cacti that can be generated at once.
export const CACTUS_LENGTH_MAX = 4;
export const CACTUS_SMALL_HEIGHT = 32;
export const CACTUS_SMALL_WIDTH = 16;
//All the hitboxes are smaller by this much.
export const COLLISION_ADJUSTMENT = 8;
export const ENEMY_TIMER_MAX = 180;
export const ENEMY_TIMER_MIN = 60;
export const FONT_SIZE = 16;
export const GRAVITY = 0.25;
//Our ground is not a straight line so we're moving it slightly up to make it appear on top of the player.
export const GROUND_OFFSET = 4;
export const GROUND_Y = 148;
export const PLAYER_ANIMATION_SPEED = 0.25;
export const PLAYER_HEIGHT = 32;
export const PLAYER_JUMP_SPEED = -4;
//The higher this is, the higher we can jump by pressing the jump button.
export const PLAYER_JUMP_TIME = 12;
export const PLAYER_SPEED = 4;
export const PLAYER_TOTAL_FRAMES = 8;
export const PLAYER_WIDTH = 32;
export const PLAYER_X = 32;
export const SCORE_X = 4;
export const SCORE_Y = 4;
export const SCREEN_FRAMERATE = 16.667;
export const SCREEN_HEIGHT = 180;
export const SCREEN_RESIZE = 4;
export const SCREEN_WIDTH = 320;

export function get_random(i_max, i_min)
{
    //Getting a random integer between and including 2 values.
    return Math.floor(i_min + Math.random() * (1 + i_max - i_min));
}