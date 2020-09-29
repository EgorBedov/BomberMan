import {DATA} from 'Interfaces';

export const WIDTH = 19;
export const HEIGHT = 10;
export const BASE_SELECTOR = '#application';

export const PLAYER_ID = 1;
export const BOMB_ID = 2;
export const WALL_ID = 3;
export const BRICK_ID = 4;
export const FIRE_ID = 5;
export const BOMB_ON_PLAYER_ID = 6;

export const STATIC_MAP: DATA = [
    [0, 0, 0, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 3, 4, 3, 4, 3, 0, 3, 0, 3, 0, 3, 0, 3, 0, 3, 0, 3, 0],
    [0, 0, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 3, 0, 3, 4, 3, 0, 3, 0, 3, 0, 3, 0, 3, 0, 3, 0, 3, 0],
    [0, 0, 0, 0, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 3, 0, 3, 4, 3, 0, 3, 0, 3, 0, 3, 0, 3, 0, 3, 0, 3, 0],
    [0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 3, 0, 3, 0, 3, 0, 3, 0, 3, 0, 3, 0, 3, 0, 3, 0, 3, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 3, 0, 3, 0, 3, 0, 3, 0, 3, 0, 3, 0, 3, 0, 3, 0, 3, 0],
];

export const TEXT = {
    BEGIN: 'Начать',
    END: 'Завершить',
    YOU_LOST: 'Вы проиграли',
    YOU_WIN: 'Вы выиграли',
};
