import {DATA, moveFuncArgs, POS} from 'Interfaces';
import {FIRE_ID} from 'Constants';
import SV from 'Core/supervisor';
import {
    getBombIdByPlayerId,
    getBombOnPLayerIdByPlayerId,
    getFireOnPlayerIdByPlayerId,
    getInitPosByPlayerId
} from 'Utils/utils';
import Data from 'Core/data';

type PowerType = number;
type IProps = {
    killPlayer: (player_id: number) => void,
    plantBomb: (player_id: number, pos: POS, power: number) => void,
}

export default class Player {
    public static rerender: () => void;

    private pos: POS;
    private bombsLeft: number;
    private power: PowerType;
    private props: IProps;
    readonly id: number;
    private readonly fire_icon_id: number;
    private readonly bomb_icon_id: number;
    private readonly bomb_id: number;
    alive: boolean;

    constructor(id: number, props: IProps) {
        this.id = id;
        this.alive = true;
        this.bomb_id = getBombIdByPlayerId(this.id);
        this.fire_icon_id = getFireOnPlayerIdByPlayerId(this.id);
        this.bomb_icon_id = getBombOnPLayerIdByPlayerId(this.id);
        this.pos = getInitPosByPlayerId(this.id);
        this.bombsLeft = 1;
        this.power = 2;
        this.props = props;

        this.setSelf();
    }

    private setSelf(): void {
        // Data.data[this.pos.row][this.pos.col] = this.icon_id;
        if (Data.data[this.pos.row][this.pos.col] === this.bomb_id) {
            Data.data[this.pos.row][this.pos.col] = this.bomb_icon_id;
        } else {
            Data.data[this.pos.row][this.pos.col] = this.id;
        }
    }

    private clearPlace(): void {
        if (Data.data[this.pos.row][this.pos.col] === this.bomb_icon_id) {
            Data.data[this.pos.row][this.pos.col] = this.bomb_id;
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
        if (Data.data[row][col] === FIRE_ID) {
            Data.data[row][col] = this.fire_icon_id;
            Player.rerender();
            this.props.killPlayer(this.id);
            return;
        }
        this.setSelf();
    }

    public plantBomb(): void {
        if (this.bombsLeft > 0) {
            this.props.plantBomb(this.id, {...this.pos}, this.power);
        }
    }
}
