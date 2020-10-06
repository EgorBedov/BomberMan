import {DATA} from 'Interfaces';

export const BASE_SELECTOR = '#application';

export const BOMB_ID = 2;
export const WALL_ID = 3;
export const BRICK_ID = 4;
export const FIRE_ID = 5;
export const BOMB_ON_PLAYER_1_ID = 6;
export const FIRE_ON_PLAYER_1_ID = 7;
export const LAVA_ID = 8;
export const NO_BLOCK_ID = 9;
export const BOMB_ON_PLAYER_2_ID = 10;
export const FIRE_ON_PLAYER_2_ID = 11;
export const BOMB_ID_2 = 12;
export const ADD_BOMB = 13;
export const ADD_POWER = 14;
export const MAKE_NUCLEAR = 15;
export const FIRE_ON_BRICK_ID = 16;
export const FIRE_ON_WALL_ID = 17;
export const PLAYER_2_ID = 18;
export const PLAYER_3_ID = 19;
export const PLAYER_4_ID = 20;
export const ENEMY_ID = 21;
export const FIRE_ON_ENEMY_ID = 22;
export const BOMB_ON_ENEMY_ID = 23;
export const PLAYER_1_ID = 24;
export const ADD_SPEED = 25;

export const BIGGEST_ID = 100;

export const ENEMIES_IDS = [];
export const MAX_ENEMIES = 5;
export const MAX_PLAYERS = 4;
for (let iii = BIGGEST_ID; iii < MAX_ENEMIES+BIGGEST_ID; iii++) ENEMIES_IDS.push(iii);

export const PLAYER_IDS = [PLAYER_1_ID, PLAYER_2_ID, PLAYER_3_ID, PLAYER_4_ID];
export const PLAYERS_ON_MAP = [...PLAYER_IDS, ...ENEMIES_IDS, BOMB_ON_PLAYER_1_ID, BOMB_ON_PLAYER_2_ID, ENEMY_ID];
export const OBSTACLES = [WALL_ID, BRICK_ID, NO_BLOCK_ID];


export const EMPTY_MAP : DATA = [
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
];

export const BASIC_MAP: DATA = [
    [0, 0, 0, 4, 4, 0, 0, 0, 0, 0, 4, 4, 4, 4, 0, 0, 0, 0, 0],
    [0, 3, 4, 3, 4, 3, 0, 3, 4, 3, 4, 3, 0, 3, 0, 3, 0, 3, 0],
    [0, 0, 4, 4, 4, 4, 0, 0, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 3, 0, 3, 4, 3, 4, 3, 4, 3, 4, 3, 0, 3, 0, 3, 0, 3, 0],
    [0, 0, 0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0],
    [0, 3, 0, 3, 4, 3, 4, 3, 4, 3, 0, 3, 4, 3, 0, 3, 0, 3, 0],
    [0, 0, 0, 0, 4, 0, 4, 4, 4, 4, 0, 4, 4, 4, 4, 0, 4, 0, 0],
    [0, 3, 0, 3, 0, 3, 0, 3, 4, 3, 0, 3, 0, 3, 4, 3, 4, 3, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 4, 0, 0, 0, 4, 4, 4, 0, 0],
    [0, 3, 0, 3, 0, 3, 0, 3, 4, 3, 0, 3, 0, 3, 0, 3, 0, 3, 0],
];

export const CIRCLE_MAP: DATA = [
    [9, 9, 9, 9, 9, 9, 9, 9, 9, 0, 4, 4, 0, 9, 9, 9, 9, 9, 9, 9, 9, 9],
    [9, 9, 9, 9, 9, 9, 0, 0, 0, 0, 4, 4, 0, 0, 0, 0, 9, 9, 9, 9, 9, 9],
    [9, 9, 9, 9, 0, 0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 9, 9, 9, 9],
    [9, 9, 9, 0, 0, 4, 4, 4, 0, 0, 0, 0, 0, 0, 4, 4, 4, 0, 0, 9, 9, 9],
    [9, 9, 0, 0, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 0, 0, 9, 9],
    [9, 9, 0, 4, 4, 0, 0, 3, 0, 0, 0, 0, 0, 0, 3, 0, 0, 4, 4, 0, 9, 9],
    [9, 0, 0, 4, 0, 0, 3, 4, 4, 0, 0, 0, 0, 4, 4, 3, 0, 0, 4, 0, 0, 9],
    [9, 0, 4, 0, 0, 3, 4, 4, 4, 3, 0, 0, 3, 4, 4, 4, 3, 0, 4, 4, 0, 9],
    [9, 0, 4, 0, 0, 0, 4, 4, 3, 0, 0, 0, 0, 3, 4, 4, 0, 0, 0, 4, 0, 9],
    [0, 0, 4, 0, 0, 0, 0, 3, 0, 0, 8, 8, 0, 0, 3, 0, 0, 0, 0, 4, 0, 0],
    [4, 4, 0, 0, 0, 0, 0, 0, 0, 8, 8, 8, 8, 0, 0, 0, 0, 0, 0, 0, 4, 4],
    [4, 4, 0, 0, 0, 0, 0, 0, 0, 8, 8, 8, 8, 0, 0, 0, 0, 0, 0, 0, 4, 4],
    [0, 0, 4, 0, 0, 0, 0, 3, 0, 0, 8, 8, 0, 0, 3, 0, 0, 0, 0, 4, 0, 0],
    [9, 0, 4, 0, 0, 0, 4, 4, 3, 0, 0, 0, 0, 3, 4, 4, 0, 0, 0, 4, 0, 9],
    [9, 0, 4, 0, 0, 3, 4, 4, 4, 3, 0, 0, 3, 4, 4, 4, 3, 0, 0, 4, 0, 9],
    [9, 0, 0, 4, 0, 0, 3, 4, 4, 0, 0, 0, 0, 4, 4, 3, 0, 0, 4, 0, 0, 9],
    [9, 9, 0, 4, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 4, 0, 9, 9],
    [9, 9, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 9, 9],
    [9, 9, 9, 0, 0, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 4, 4, 0, 0, 9, 9, 9],
    [9, 9, 9, 9, 0, 0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 9, 9, 9, 9],
    [9, 9, 9, 9, 9, 9, 0, 0, 0, 0, 4, 4, 0, 0, 0, 0, 9, 9, 9, 9, 9, 9],
    [9, 9, 9, 9, 9, 9, 9, 9, 9, 0, 4, 4, 0, 9, 9, 9, 9, 9, 9, 9, 9, 9],
];

export const MAPS: Array<DATA> = [EMPTY_MAP, BASIC_MAP, CIRCLE_MAP];

export const EMPTY_MAP_INDEX = 0;
export const BASIC_MAP_INDEX = 1;
export const CIRCLE_MAP_INDEX = 2;
export const SECRET_MAP_INDEX = 3;


const SECRET_MAP: DATA = [
    [0,0,0,0,0,0,0,0,0,0,0, 0,0, 0,0,0,0,0, 0 ,0,0,0,0, 0, 0,0,0,0, 0,0, 0,0,0,0,0,0,0,0,0,0,0],
    [0,0,8,8,0,0,0,8,8,0,0, 0,0, 0,0,4,4,4, 0 ,4,0,0,4, 0, 0,4,4,4, 0,0, 0,0,8,8,0,0,0,8,8,0,0],
    [0,8,8,8,8,0,8,8,8,8,0, 0,0, 0,0,4,0,4, 0 ,4,0,0,4, 0, 4,0,0,4, 0,0, 0,8,8,8,8,0,8,8,8,8,0],
    [8,8,8,8,8,8,8,8,8,8,8, 0,0, 0,0,4,0,4, 0 ,4,0,0,4, 0, 4,0,0,4, 0,0, 8,8,8,8,8,8,8,8,8,8,8],
    [8,8,8,8,8,8,8,8,8,8,8, 0,0, 0,4,0,0,4, 0 ,4,4,4,4, 0, 4,0,0,4, 0,0, 8,8,8,8,8,8,8,8,8,8,8],
    [0,8,8,8,8,8,8,8,8,8,0, 0,0, 0,4,0,0,4, 0 ,4,4,4,4, 0, 0,4,4,4, 0,0, 0,8,8,8,8,8,8,8,8,8,0],
    [0,0,8,8,8,8,8,8,8,0,0, 0,0, 0,4,4,4,4, 0 ,4,0,0,4, 0, 0,4,0,4, 0,0, 0,0,8,8,8,8,8,8,8,0,0],
    [0,0,0,8,8,8,8,8,0,0,0, 0,0, 4,0,0,0,4, 0 ,4,0,0,4, 0, 4,0,0,4, 0,0, 0,0,0,8,8,8,8,8,0,0,0],
    [0,0,0,0,8,8,8,0,0,0,0, 0,0, 4,0,0,0,4, 0 ,4,0,0,4, 0, 4,0,0,4, 0,0, 0,0,0,0,8,8,8,0,0,0,0],
    [0,0,0,0,0,8,0,0,0,0,0, 0,0, 4,0,0,0,4, 0 ,4,0,0,4, 0, 4,0,0,4, 0,0, 0,0,0,0,0,8,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0, 0,0, 0,0,0,0,0, 0 ,0,0,0,0, 0, 0,0,0,0, 0,0, 0,0,0,0,0,0,0,0,0,0,0],
];

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

export type moveHandlerArgument = typeof UP | typeof DOWN | typeof LEFT | typeof RIGHT;

export const UNIT_SIZE = 40;
