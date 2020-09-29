import {DATA, moveFuncArgs, POS} from 'Interfaces';
import {
    BOMB_ID, BOMB_ID_2,
    BOMB_ON_PLAYER_ID, BOMB_ON_SECOND_PLAYER_ID,
    BRICK_ID,
    FIRE_ID,
    FIRE_ON_PLAYER_ID,
    FIRE_ON_SECOND_PLAYER_ID, HEIGHT,
    PLAYER_ID,
    SECOND_PLAYER_ID, WIDTH
} from 'Constants';
import SV from 'Core/supervisor';

type PowerType = number;
type FireArea = Array<POS>;
type IProps = {
    rerender:() => void,
    loseGame:(id: number) => void,
}

export default class Player {
    private data: DATA;
    private pos: POS;
    private bombsLeft: number;
    private power: PowerType;
    private props: IProps;
    private id: number;
    private icon_id: number;
    private fire_icon_id: number;
    private bomb_icod_id: number;
    private bomb_id: number;

    constructor(id: number, data: DATA, props: IProps) {
        this.id = id;
        this.icon_id = this.id === 1 ? PLAYER_ID : SECOND_PLAYER_ID;
        this.bomb_id = this.id === 1 ? BOMB_ID : BOMB_ID_2;
        this.fire_icon_id = this.id === 1 ? FIRE_ON_PLAYER_ID : FIRE_ON_SECOND_PLAYER_ID;
        this.bomb_icod_id = this.id === 1 ? BOMB_ON_PLAYER_ID : BOMB_ON_SECOND_PLAYER_ID;
        this.data = data;
        this.pos = this.id === 1 ? {row: 0, col: 0} : {row: HEIGHT-1, col: WIDTH-1};
        this.bombsLeft = 1;
        this.power = 2;
        this.props = props;

        this.setSelf();
    }

    private setSelf(): void {
        if (this.data[this.pos.row][this.pos.col] === this.bomb_id) {
            this.data[this.pos.row][this.pos.col] = this.bomb_icod_id;
        } else {
            this.data[this.pos.row][this.pos.col] = this.icon_id;
        }
    }

    private clearPlace(): void {
        if (this.data[this.pos.row][this.pos.col] === this.bomb_icod_id) {
            this.data[this.pos.row][this.pos.col] = this.bomb_id;
        } else {
            this.data[this.pos.row][this.pos.col] = 0;
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

        if (SV.canPlace(this.icon_id, {row, col}, this.data)) {
            this.pos = {row, col};
        } else {
            this.setSelf();
            return;
        }
        if (this.data[row][col] === FIRE_ID) {
            this.data[row][col] = this.fire_icon_id;
            this.props.rerender();
            this.props.loseGame(this.id);
            return;
        }
        this.setSelf();
    }

    public plantBomb(): void {
        if (this.bombsLeft > 0) {
            this.data[this.pos.row][this.pos.col] = this.bomb_icod_id;
            this.props.rerender();
            const pos = {...this.pos};
            setTimeout(() => {this.startBoom(pos, this.power, this.pos);}, 2000);
        }
    }

    private startBoom(pos: POS, power: PowerType, curr_pos: POS): void {
        const fire: FireArea = [{...pos}];

        for (let iii = 0; iii < 4; iii++) {
            for (let jjj = 1; jjj < power + 1; jjj++) {
                const tmp_pos = {...pos};
                switch (iii) {
                case 0:     tmp_pos.row += jjj;     break;
                case 1:     tmp_pos.row -= jjj;     break;
                case 2:     tmp_pos.col += jjj;     break;
                case 3:     tmp_pos.col -= jjj;     break;
                }

                if (!SV.canPlace(FIRE_ID, tmp_pos, this.data)) break;
                fire.push({...tmp_pos});
                if (this.data[tmp_pos.row][tmp_pos.col] === BRICK_ID) break;
            }
        }

        let end = 0;
        fire.forEach((fire_pos) => {
            if (this.data[fire_pos.row][fire_pos.col] === PLAYER_ID) {
                end = PLAYER_ID;
                this.data[fire_pos.row][fire_pos.col] = FIRE_ON_PLAYER_ID;
            } else if (this.data[fire_pos.row][fire_pos.col] === SECOND_PLAYER_ID) {
                end = SECOND_PLAYER_ID;
                this.data[fire_pos.row][fire_pos.col] = FIRE_ON_SECOND_PLAYER_ID;
            } else {
                this.data[fire_pos.row][fire_pos.col] = FIRE_ID;
            }
        });
        this.props.rerender();
        if (end) {
            this.props.loseGame(end);
        } else {
            setTimeout(() => {this.endBoom(pos, fire);}, 2000);
        }
    }

    private endBoom(pos: POS, fire: FireArea): void {
        this.data[pos.row][pos.col] = 0;
        fire.forEach((fire_pos) => this.data[fire_pos.row][fire_pos.col] = 0);
        this.props.rerender();
    }
}
