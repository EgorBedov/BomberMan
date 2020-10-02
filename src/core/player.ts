import {POS} from 'Interfaces';
import {ADD_BOMB, ADD_POWER, BOMB_ID, DIRECTIONS, FIRE_ID, MAKE_NUCLEAR} from 'Constants';
import {
    canPlace,
    getBombOnPLayerIdByPlayerId,
    getFireOnPlayerIdByPlayerId,
    getInitPosByPlayerId
} from 'Utils/utils';
import Data from 'Core/data';
import Bomb from 'Core/bomb';

type PowerType = number;

export default class Player {
    public static rerender: () => void;
    public static killPlayer: (player_id: number) => void;

    public readonly id: number;
    public pos: POS;
    public bombsLeft = 1;
    public alive: boolean;
    public abilities = {
        nuclear: false,
        slow: false,
    };

    private readonly fire_icon_id: number;
    private readonly bomb_icon_id: number;
    private power: PowerType = 2;

    constructor(id: number) {
        this.id = id;
        this.alive = true;
        this.fire_icon_id = getFireOnPlayerIdByPlayerId(this.id);
        this.bomb_icon_id = getBombOnPLayerIdByPlayerId(this.id);
        this.pos = getInitPosByPlayerId(this.id);
    }

    public setSelf(): void {
        if (!this.alive) return;
        if (Data.data[this.pos.row][this.pos.col] === BOMB_ID) {
            Data.data[this.pos.row][this.pos.col] = this.bomb_icon_id;
        } else {
            Data.data[this.pos.row][this.pos.col] = this.id;
        }
        Player.rerender();
    }

    private clearPlace(): void {
        if (Data.data[this.pos.row][this.pos.col] === this.bomb_icon_id) {
            Data.data[this.pos.row][this.pos.col] = BOMB_ID;
        } else {
            Data.data[this.pos.row][this.pos.col] = 0;
        }
    }

    public move(where: string): boolean {
        if (!this.alive) return false;
        let {row, col} = this.pos;
        this.clearPlace();
        switch (where) {
        case DIRECTIONS[0]:     row--;      break;
        case DIRECTIONS[1]:     row++;      break;
        case DIRECTIONS[2]:     col--;      break;
        case DIRECTIONS[3]:     col++;      break;
        }

        if (canPlace(this.id, {row, col}, Data.data)) {
            this.pos = {row, col};
        } else {
            this.setSelf();
            return false;
        }
        switch (Data.data[this.pos.row][this.pos.col]) {
        case FIRE_ID:
            Data.data[row][col] = this.fire_icon_id;
            Player.rerender();
            Player.killPlayer(this.id);
            return false;
        case ADD_BOMB:
            this.bombsLeft++;
            break;
        case ADD_POWER:
            this.power++;
            break;
        case MAKE_NUCLEAR:
            this.abilities.nuclear = true;
            break;
        }
        this.setSelf();
        return true;
    }

    public plantBomb(): void {
        if (this.bombsLeft > 0) {
            new Bomb(this, {...this.pos}, this.power);
        }
    }
}
