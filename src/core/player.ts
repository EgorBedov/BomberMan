import {DATA, moveFunc, moveFuncArgs, POS} from 'Interfaces';
import {BRICK_ID, HEIGHT, PLAYER_ID, WALL_ID, WIDTH} from 'Constants';
import {isNumberInRange} from 'Utils/utils';

export default class Player {
    private data: DATA;
    private pos: POS;
    static move: moveFunc;

    constructor(data: DATA) {
        this.data = data;
        this.pos = {row: 0, column: 0};
        this.setSelf();
    }

    private setSelf(): void {
        this.data[this.pos.row][this.pos.column] = PLAYER_ID;
    }

    public move(where: moveFuncArgs): void {
        let {row, column} = this.pos;
        this.data[row][column] = 0;
        switch (where) {
        case 'up':      row--;      break;
        case 'down':    row++;      break;
        case 'left':    column--;   break;
        case 'right':   column++;   break;
        }

        if (isNumberInRange(row, 0, HEIGHT-1)
            && isNumberInRange(column, 0, WIDTH-1)
            && ![WALL_ID, BRICK_ID].includes(this.data[row][column])) this.pos = {row: row, column: column};
        this.setSelf();
    }
}
