export const BASE_SELECTOR = '#application';

export const BOMB_ID = 2;
export const WALL_ID = 3;
export const BRICK_ID = 4;
export const FIRE_ID = 5;
export const LAVA_ID = 8;
export const NO_BLOCK_ID = 9;
export const BOMB_ID_2 = 12;
export const ADD_BOMB = 13;
export const ADD_POWER = 14;
export const MAKE_NUCLEAR = 15;
export const PLAYER_2_ID = 18;
export const PLAYER_3_ID = 19;
export const PLAYER_4_ID = 20;
export const ENEMY_ID = 21;
export const PLAYER_1_ID = 24;
export const ADD_SPEED = 25;

export const BIGGEST_ID = 100;

export const ENEMIES_IDS = [];
export const MAX_ENEMIES = 5;
for (let iii = BIGGEST_ID; iii < MAX_ENEMIES+BIGGEST_ID; iii++) ENEMIES_IDS.push(iii);

export const OBSTACLES = [WALL_ID, BRICK_ID, NO_BLOCK_ID];


export const TEXT = {
    BEGIN: 'Начать',
    END: 'Завершить',
    YOU_LOST: 'Вы проиграли',
    YOU_WIN: 'Вы выиграли',
};

export const UP = 1;
export const DOWN = 2;
export const LEFT = 3;
export const RIGHT = 4;

export const DIRECTIONS = [UP, DOWN, LEFT, RIGHT];

export const TOP_SIDE = 1;
export const BOTTOM_SIDE = 2;
export const LEFT_SIDE = 3;
export const RIGHT_SIDE = 4;

export type moveHandlerArgument = 1 | 2 | 3 | 4;

const UNIT_SIZE = 40;
export const UNIT_HEIGHT = UNIT_SIZE;
export const UNIT_WIDTH = UNIT_SIZE;
