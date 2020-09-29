import Designer from 'Core/designer';
import {DATA, moveFuncArgs, POS} from 'Interfaces';
import {getMatrix, isNumberInRange} from 'Utils/utils';
import Player from 'Core/player';
import {BOMB_ID, BRICK_ID, FIRE_ID, HEIGHT, PLAYER_ID, STATIC_MAP, WALL_ID, WIDTH} from 'Constants';


class SV {
    private designer: Designer;
    private data: DATA;
    private gameOver: boolean;
    private player: Player;

    constructor() {
        this.clear();
        this.player = new Player(this.data, this.rerender.bind(this));
        this.designer = new Designer(this.data, this.move.bind(this), this.player.plantBomb.bind(this.player));
    }

    public start(): void {
        this.clear();
        this.rerender();
    }

    public move(where: moveFuncArgs): void {
        this.player.move(where);
        this.rerender();
    }

    private rerender() {
        this.designer.updateCanvas();
    }

    private clear() {
        this.gameOver = false;
        // this.data = getMatrix();
        this.data = STATIC_MAP;
    }

    public static canPlace(what: number, pos: POS, data: DATA): boolean {
        let arr: Array<number>;
        switch (what) {
        case PLAYER_ID: arr = [WALL_ID, BRICK_ID, BOMB_ID];     break;
        case FIRE_ID:   arr = [WALL_ID];                        break;
        }

        return isNumberInRange(pos.row, 0, HEIGHT-1)
            && isNumberInRange(pos.col, 0, WIDTH-1)
            && !arr.includes(data[pos.row][pos.col]);
    }
}

export default SV;
