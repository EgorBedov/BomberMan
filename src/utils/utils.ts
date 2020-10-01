import {
    ADD_BOMB, ADD_POWER,
    BOMB_ID, BOMB_ID_2,
    BOMB_ON_PLAYER_ID,
    BOMB_ON_SECOND_PLAYER_ID,
    FIRE_ON_PLAYER_ID, FIRE_ON_SECOND_PLAYER_ID,
    HEIGHT, MAKE_NUCLEAR,
    PLAYER_ID,
    SECOND_PLAYER_ID,
    WIDTH
} from 'Constants';
import {DATA, POS} from 'Interfaces';
import Player from 'Core/player';

export const getMatrix = function(width: number = WIDTH, height: number = HEIGHT): DATA {
    const tmpArray = [];
    for (let iii = 0; iii < height; iii++) {
        tmpArray.push([]);
        for (let jjj = 0; jjj < width; jjj++) {
            tmpArray[iii].push(0);
        }
    }
    return tmpArray;
}

export const isNumberInRange = function(num: number, min: number, max: number): boolean {
    return num >= min && num <= max;
}

export const getBombOnPLayerIdByPlayerId = function(player_id: number): number {
    switch (player_id) {
    case PLAYER_ID: return BOMB_ON_PLAYER_ID;
    case SECOND_PLAYER_ID: return BOMB_ON_SECOND_PLAYER_ID;
    }
}

export const getBombIdByPlayer = function(p: Player): number {
    switch (p.id) {
    case PLAYER_ID: return BOMB_ID;
    case SECOND_PLAYER_ID: return BOMB_ID_2;
    }
}

export const getFireOnPlayerIdByPlayerId = function(player_id: number): number {
    switch (player_id) {
    case PLAYER_ID: return FIRE_ON_PLAYER_ID;
    case SECOND_PLAYER_ID: return FIRE_ON_SECOND_PLAYER_ID;
    default: return 0;
    }
}

export const getFireOnPlayerIdBy = function(id: number): number {
    switch (id) {
    case BOMB_ON_PLAYER_ID: return FIRE_ON_PLAYER_ID;
    case BOMB_ON_SECOND_PLAYER_ID: return FIRE_ON_SECOND_PLAYER_ID;
    default: return getFireOnPlayerIdByPlayerId(id);
    }
}

export const getInitPosByPlayerId = function(player_id: number): POS {
    switch (player_id) {
    case PLAYER_ID: return {row: 0, col: 0};
    case SECOND_PLAYER_ID: return {row: 0, col: WIDTH-1};
    case 3: return {row: HEIGHT-1, col: 0};
    case 4: return {row: HEIGHT-1, col: WIDTH-1};
    }
}

export function getPlayerId(id: number): number {
    switch (id) {
    case PLAYER_ID:
    case BOMB_ON_PLAYER_ID:
    case FIRE_ON_PLAYER_ID: return PLAYER_ID;
    case SECOND_PLAYER_ID:
    case BOMB_ON_SECOND_PLAYER_ID:
    case FIRE_ON_SECOND_PLAYER_ID: return SECOND_PLAYER_ID;
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
