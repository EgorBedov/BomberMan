import {DATA, moveFuncArgs, POS} from 'Interfaces';
import {BOMB_ID, BOMB_ON_PLAYER_ID, BRICK_ID, FIRE_ID, FIRE_ON_PLAYER_ID, PLAYER_ID} from 'Constants';
import SV from 'Core/supervisor';

type PowerType = number;
type FireArea = Array<POS>;
type IProps = {
    rerender:() => void,
    loseGame:() => void,
}

export default class Player {
    private data: DATA;
    private pos: POS;
    private bombsLeft: number;
    private power: PowerType;
    private props: IProps;

    constructor(data: DATA, props: IProps) {
        this.data = data;
        this.pos = {row: 0, col: 0};
        this.bombsLeft = 1;
        this.power = 2;
        this.props = props;

        this.setSelf();
    }

    private setSelf(): void {
        if (this.data[this.pos.row][this.pos.col] === BOMB_ID) {
            this.data[this.pos.row][this.pos.col] = BOMB_ON_PLAYER_ID;
        } else {
            this.data[this.pos.row][this.pos.col] = PLAYER_ID;
        }
    }

    private clearPlace(): void {
        if (this.data[this.pos.row][this.pos.col] === BOMB_ON_PLAYER_ID) {
            this.data[this.pos.row][this.pos.col] = BOMB_ID;
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

        if (SV.canPlace(PLAYER_ID, {row, col}, this.data)) this.pos = {row, col};
        if (this.data[row][col] === FIRE_ID) {
            this.data[row][col] = FIRE_ON_PLAYER_ID;
            this.props.rerender();
            this.props.loseGame();
            return;
        }
        this.setSelf();
    }

    public plantBomb(): void {
        if (this.bombsLeft > 0) {
            this.data[this.pos.row][this.pos.col] = BOMB_ON_PLAYER_ID;
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

        let end = false;
        fire.forEach((fire_pos) => {
            if (fire_pos.row === curr_pos.row && fire_pos.col === curr_pos.col) {
                end = true;
                this.data[fire_pos.row][fire_pos.col] = FIRE_ON_PLAYER_ID;
            } else {
                this.data[fire_pos.row][fire_pos.col] = FIRE_ID;
            }
        });
        this.props.rerender();
        if (end) {
            this.props.loseGame();
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
