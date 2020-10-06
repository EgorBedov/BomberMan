import {
    ADD_BOMB,
    ADD_POWER, ADD_SPEED,
    BASIC_MAP_INDEX,
    BOMB_ID,
    BOMB_ID_2, BOMB_ON_ENEMY_ID,
    BOMB_ON_PLAYER_1_ID,
    BOMB_ON_PLAYER_2_ID,
    BRICK_ID,
    CIRCLE_MAP_INDEX,
    EMPTY_MAP_INDEX, ENEMIES_IDS,
    ENEMY_ID,
    FIRE_ID,
    FIRE_ON_BRICK_ID,
    FIRE_ON_ENEMY_ID,
    FIRE_ON_PLAYER_1_ID,
    FIRE_ON_PLAYER_2_ID,
    FIRE_ON_WALL_ID,
    LAVA_ID,
    MAKE_NUCLEAR,
    NO_BLOCK_ID,
    PLAYER_1_ID,
    PLAYER_2_ID,
    PLAYER_3_ID,
    PLAYER_4_ID, PLAYER_IDS,
    WALL_ID,
} from 'Constants';
import {Boundaries, DATA, POS} from 'Interfaces';
import Data from 'Core/data';
import Unit from 'Core/unit';


export const isNumberInRange = function(num: number, min: number, max: number): boolean {
    return num >= min && num <= max;
}

export const getBombOnPLayerIdByPlayerId = function(player_id: number): number {
    switch (true) {
    case player_id === PLAYER_1_ID: return BOMB_ON_PLAYER_1_ID;
    case player_id === PLAYER_2_ID: return BOMB_ON_PLAYER_2_ID;
    case ENEMIES_IDS.includes(player_id):
    case player_id === ENEMY_ID: return BOMB_ON_ENEMY_ID;
    default: return BOMB_ID;
    }
}

export const getFireOnPlayerIdByPlayerId = function(player_id: number): number {
    switch (true) {
    case player_id === PLAYER_1_ID: return FIRE_ON_PLAYER_1_ID;
    case player_id === PLAYER_2_ID: return FIRE_ON_PLAYER_2_ID;
    case ENEMIES_IDS.includes(player_id):
    case player_id === ENEMY_ID: return FIRE_ON_ENEMY_ID;
    default: return 0;
    }
}

export const getFireOnPlayerIdBy = function(id: number): number {
    switch (true) {
    case id === BOMB_ON_PLAYER_1_ID: return FIRE_ON_PLAYER_1_ID;
    case id === BOMB_ON_PLAYER_2_ID: return FIRE_ON_PLAYER_2_ID;
    case ENEMIES_IDS.includes(id):
    case id === BOMB_ON_ENEMY_ID: return FIRE_ON_ENEMY_ID;
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
    default: return {row: 0, col: 0};
    }
}

export const getInitEnemyPosBy = function(index: number): POS {
    switch (Data.map_id) {
    case EMPTY_MAP_INDEX:
    case BASIC_MAP_INDEX:
        switch (index) {
        // case 0: return {row: 0, col: 0};
        case 1: return {row: 0, col: Data.width-1};
        case 2: return {row: Data.height-1, col: 0};
        case 3: return {row: Data.height-1, col: Data.width-1};
        }
        break;
    case CIRCLE_MAP_INDEX:
        switch (index) {
        // case 0: return {row: 3, col: 3};
        case 1: return {row: 3, col: Data.width-1-3};
        case 2: return {row: Data.height-1-3, col: 3};
        case 3: return {row: Data.height-1-3, col: Data.width-1-3};
        }
        break;
    default: return {row: 0, col: 0};
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
    case BOMB_ON_ENEMY_ID:
    case FIRE_ON_ENEMY_ID:
    default: return id;
    }
}

export function getBonus(): number {
    switch (getRandomInt(15)) {
    case 4:
    case 5: return ADD_BOMB;
    case 6:
    case 7: return ADD_POWER;
    case 8:
    case 9: return ADD_SPEED;
    case 10: return MAKE_NUCLEAR;
    default: return 0;
    }
}

export function getRandomInt(max: number): number {
    return Math.floor(Math.random() * Math.floor(max));
}

export function canPlace(what: number, pos: POS, data: DATA): boolean {
    let arr: Array<number>;
    switch (true) {
    case what === ENEMY_ID:
    case ENEMIES_IDS.includes(what):
    case PLAYER_IDS.includes(what):
        arr = [...ENEMIES_IDS, NO_BLOCK_ID, ...PLAYER_IDS, BOMB_ON_ENEMY_ID, BOMB_ON_PLAYER_1_ID, BOMB_ON_PLAYER_2_ID, WALL_ID, BRICK_ID, LAVA_ID, BOMB_ID, BOMB_ID_2, FIRE_ON_WALL_ID, FIRE_ON_BRICK_ID];
        if (ENEMIES_IDS.includes(what)) arr.push(FIRE_ID);
        break;
    case what === FIRE_ID:   arr = [NO_BLOCK_ID, WALL_ID, LAVA_ID]; break;
    case what === MAKE_NUCLEAR:   arr = [NO_BLOCK_ID, LAVA_ID]; break;
    }

    return isNumberInRange(pos.row, 0, Data.height-1)
        && isNumberInRange(pos.col, 0, Data.width-1)
        && !arr.includes(data[pos.row][pos.col]);
}

export function collide(u1: Unit, u2: Unit): boolean {
    const sides1 = new Boundaries(u1);
    const sides2 = new Boundaries(u2);

    return (sides1.bottom >= sides2.top &&
            sides1.left <= sides2.right &&
            sides1.top <= sides2.bottom &&
            sides1.right >= sides2.left);
}
