import {moveFuncArgs, POS} from 'Interfaces';
import {ADD_BOMB, ADD_POWER, BOMB_ID, FIRE_ID, MAKE_NUCLEAR} from 'Constants';
import SV from 'Core/supervisor';
import {
    getBombIdByPlayer,
    getBombOnPLayerIdByPlayerId,
    getFireOnPlayerIdByPlayerId,
    getInitPosByPlayerId
} from 'Utils/utils';
import Data from 'Core/data';
import Bomb from 'Core/bomb';

type PowerType = number;
type IProps = {
    killPlayer: (player_id: number) => void,
}

export default class Player {
    public static rerender: () => void;

    private pos: POS;
    public bombsLeft: number;
    private power: PowerType;
    private props: IProps;
    readonly id: number;
    private readonly fire_icon_id: number;
    private readonly bomb_icon_id: number;
    alive: boolean;
    public abilities = {
        nuclear: false,
        slow: false,
    };

    constructor(id: number, props: IProps) {
        this.id = id;
        this.alive = true;
        this.fire_icon_id = getFireOnPlayerIdByPlayerId(this.id);
        this.bomb_icon_id = getBombOnPLayerIdByPlayerId(this.id);
        this.pos = getInitPosByPlayerId(this.id);
        this.bombsLeft = 1;
        this.power = 2;
        this.props = props;

        this.setSelf();
    }

    private setSelf(): void {
        if (Data.data[this.pos.row][this.pos.col] === BOMB_ID) {
            Data.data[this.pos.row][this.pos.col] = this.bomb_icon_id;
        } else {
            Data.data[this.pos.row][this.pos.col] = this.id;
        }
    }

    private clearPlace(): void {
        if (Data.data[this.pos.row][this.pos.col] === this.bomb_icon_id) {
            Data.data[this.pos.row][this.pos.col] = BOMB_ID;
        } else {
            Data.data[this.pos.row][this.pos.col] = 0;
        }
    }

    public move(where: moveFuncArgs): void {
        let {row, col} = this.pos;
        this.clearPlace();
        switch (where) {
        case 'up':      row--;      break;
        case 'down':    row++;      break;
        case 'left':    col--;   break;
        case 'right':   col++;   break;
        }

        if (SV.canPlace(this.id, {row, col}, Data.data)) {
            this.pos = {row, col};
        } else {
            this.setSelf();
            return;
        }
        switch (Data.data[this.pos.row][this.pos.col]) {
        case FIRE_ID:
            Data.data[row][col] = this.fire_icon_id;
            Player.rerender();
            this.props.killPlayer(this.id);
            return;
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
    }

    public plantBomb(): void {
        if (this.bombsLeft > 0) {
            new Bomb(this, {...this.pos}, this.power);
        }
    }
}
