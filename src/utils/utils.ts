import {
    ADD_BOMB, ADD_POWER, BASIC_MAP_INDEX,
    BOMB_ID, BOMB_ID_2,
    BOMB_ON_PLAYER_1_ID,
    BOMB_ON_PLAYER_2_ID, BRICK_ID, CIRCLE_MAP_INDEX, EMPTY_MAP_INDEX, FIRE_ID, FIRE_ON_BRICK_ID,
    FIRE_ON_PLAYER_1_ID, FIRE_ON_PLAYER_2_ID, FIRE_ON_WALL_ID, LAVA_ID,
    MAKE_NUCLEAR, NO_BLOCK_ID,
    PLAYER_1_ID,
    PLAYER_2_ID, PLAYER_3_ID, PLAYER_4_ID, WALL_ID,
} from 'Constants';
import {DATA, POS} from 'Interfaces';
import Player from 'Core/player';
import Data from 'Core/data';


export const isNumberInRange = function(num: number, min: number, max: number): boolean {
    return num >= min && num <= max;
}

export const getBombOnPLayerIdByPlayerId = function(player_id: number): number {
    switch (player_id) {
    case PLAYER_1_ID: return BOMB_ON_PLAYER_1_ID;
    case PLAYER_2_ID: return BOMB_ON_PLAYER_2_ID;
    }
}

export const getBombIdByPlayer = function(p: Player): number {
    switch (p.id) {
    case PLAYER_1_ID: return BOMB_ID;
    case PLAYER_2_ID: return BOMB_ID_2;
    }
}

export const getFireOnPlayerIdByPlayerId = function(player_id: number): number {
    switch (player_id) {
    case PLAYER_1_ID: return FIRE_ON_PLAYER_1_ID;
    case PLAYER_2_ID: return FIRE_ON_PLAYER_2_ID;
    default: return 0;
    }
}

export const getFireOnPlayerIdBy = function(id: number): number {
    switch (id) {
    case BOMB_ON_PLAYER_1_ID: return FIRE_ON_PLAYER_1_ID;
    case BOMB_ON_PLAYER_2_ID: return FIRE_ON_PLAYER_2_ID;
    default: return getFireOnPlayerIdByPlayerId(id);
    }
}

export const getInitPosByPlayerId = function(player_id: number): POS {
    switch (Data.map_id) {
    case EMPTY_MAP_INDEX:
    case BASIC_MAP_INDEX:
        switch (player_id) {
        case PLAYER_1_ID: return {row: 0, col: 0};
        case PLAYER_2_ID: return {row: 0, col: Data.width-1};
        case PLAYER_3_ID: return {row: Data.height-1, col: 0};
        case PLAYER_4_ID: return {row: Data.height-1, col: Data.width-1};
        }
        break;
    case CIRCLE_MAP_INDEX:
        switch (player_id) {
        case PLAYER_1_ID: return {row: 3, col: 3};
        case PLAYER_2_ID: return {row: 3, col: Data.width-1-3};
        case PLAYER_3_ID: return {row: Data.height-1-3, col: 3};
        case PLAYER_4_ID: return {row: Data.height-1-3, col: Data.width-1-3};
        }
        break;
    }
}

export function getPlayerId(id: number): number {
    switch (id) {
    case PLAYER_1_ID:
    case BOMB_ON_PLAYER_1_ID:
    case FIRE_ON_PLAYER_1_ID: return PLAYER_1_ID;
    case PLAYER_2_ID:
    case BOMB_ON_PLAYER_2_ID:
    case FIRE_ON_PLAYER_2_ID: return PLAYER_2_ID;
    default: return 0;
    }
}

export function getBonus(): number {
    switch (getRandomInt(15)) {
    case 4:
    case 5: return ADD_BOMB;
    case 6:
    case 7: return ADD_POWER;
    case 10: return MAKE_NUCLEAR;
    default: return 0;
    }
}

export function getRandomInt(max: number): number {
    return Math.floor(Math.random() * Math.floor(max));
}

export function canPlace(what: number, pos: POS, data: DATA): boolean {
    let arr: Array<number>;
    switch (what) {
    case PLAYER_2_ID:
    case PLAYER_1_ID: arr = [NO_BLOCK_ID, PLAYER_1_ID, PLAYER_2_ID, WALL_ID, BRICK_ID, LAVA_ID, BOMB_ID, BOMB_ID_2, FIRE_ON_WALL_ID, FIRE_ON_BRICK_ID]; break;
    case FIRE_ID:   arr = [NO_BLOCK_ID, WALL_ID, LAVA_ID]; break;
    case MAKE_NUCLEAR:   arr = [NO_BLOCK_ID, LAVA_ID]; break;
    }

    return isNumberInRange(pos.row, 0, Data.height-1)
        && isNumberInRange(pos.col, 0, Data.width-1)
        && !arr.includes(data[pos.row][pos.col]);
}
