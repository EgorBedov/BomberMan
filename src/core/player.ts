import {DATA, moveFunc, moveFuncArgs, POS} from 'Interfaces';
import {BOMB_ID, BOMB_ON_PLAYER_ID, FIRE_ID, PLAYER_ID} from 'Constants';
import SV from 'Core/supervisor';

type PowerType = number;
type FireArea = Array<POS>;

export default class Player {
    private data: DATA;
    private pos: POS;
    private bombsLeft: number;
    private power: PowerType;
    static move: moveFunc;
    private rerender: () => void;
    static plantBomb: () => void;

    constructor(data: DATA, rerender:() => void) {
        this.data = data;
        this.pos = {row: 0, col: 0};
        this.bombsLeft = 1;
        this.power = 2;

        this.rerender = rerender;
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

        if (SV.canPlace(PLAYER_ID, row, col, this.data) && this.data[row][col] !== BOMB_ID) this.pos = {row: row, col: col};
        this.setSelf();
    }

    public plantBomb(): void {
        if (this.bombsLeft > 0) {
            this.data[this.pos.row][this.pos.col] = BOMB_ON_PLAYER_ID;
            this.rerender();
            const pos = {...this.pos};
            setTimeout(() => {this.startBoom(pos, this.power);}, 2000);
        }
    }

    private startBoom(pos: POS, power: PowerType): void {
        const fire: FireArea = [];
        this.data[pos.row][pos.col] = FIRE_ID;
        for (let iii = 1; iii < power + 1; iii++) {
            this.placeFire(pos.row+iii, pos.col, fire);
            this.placeFire(pos.row-iii, pos.col, fire);
            this.placeFire(pos.row, pos.col+iii, fire);
            this.placeFire(pos.row, pos.col-iii, fire);
        }
        this.rerender();

        setTimeout(() => {this.endBoom(pos, fire);}, 2000);
    }

    private placeFire(row: number, col: number, fire: FireArea): void {
        if (SV.canPlace(FIRE_ID, row, col, this.data)) {
            this.data[row][col] = FIRE_ID;
            fire.push({row: row, col: col});
        }
    }

    private endBoom(pos: POS, fire: FireArea): void {
        this.data[pos.row][pos.col] = 0;
        fire.forEach((fire_pos) => this.data[fire_pos.row][fire_pos.col] = 0);
        this.rerender();
    }
}
