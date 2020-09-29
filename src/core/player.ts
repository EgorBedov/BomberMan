import {DATA, moveFunc, moveFuncArgs, POS} from 'Interfaces';
import {HEIGHT, PLAYER_ID, WIDTH} from 'Constants';

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
        this.data[this.pos.row][this.pos.column] = 0;
        switch (where) {
        case 'up':
            if (this.pos.row > 0) this.pos.row--;
            break;
        case 'left':
            if (this.pos.column > 0) this.pos.column--;
            break;
        case 'right':
            if (this.pos.column < WIDTH - 1) this.pos.column++;
            break;
        case 'down':
            if (this.pos.row < HEIGHT - 1) this.pos.row++;
            break;
        }
        this.setSelf();
    }
}
