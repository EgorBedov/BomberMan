import Designer from 'Core/designer';
import {DATA, moveFuncArgs, POS} from 'Interfaces';
import {getMatrix, isNumberInRange} from 'Utils/utils';
import Player from 'Core/player';
import {BOMB_ID, BRICK_ID, FIRE_ID, HEIGHT, PLAYER_ID, STATIC_MAP, TEXT, WALL_ID, WIDTH} from 'Constants';


class SV {
    private designer: Designer;
    private data: DATA;
    private gameOver: boolean;
    private player: Player;

    constructor() {
        this.gameOver = true;
        this.data = getMatrix();
        this.designer = new Designer(this.data, {
            onKeyPress: this.handleKeyPress.bind(this),
            onBtnClick: this.handleStartButtonClick.bind(this)
        });
        this.player = null;
        this.rerender();
    }

    public start(): void {
        this.gameOver = false;
        this.data = JSON.parse(JSON.stringify(STATIC_MAP));
        this.player = new Player(this.data,
            {rerender: this.rerender.bind(this), loseGame: this.loseGame.bind(this)});
    }

    public handleKeyPress(ev: KeyboardEvent): void {
        if (this.gameOver) return;

        let where: moveFuncArgs;
        switch (ev.code) {
        case 'KeyW':
        case 'ArrowUp':
            where = 'up';
            break;
        case 'ArrowLeft':
        case 'KeyA':
            where = 'left';
            break;
        case 'ArrowRight':
        case 'KeyD':
            where = 'right';
            break;
        case 'ArrowDown':
        case 'KeyS':
            where = 'down';
            break;
        case 'Space':
            this.player.plantBomb();
            break;
        }

        this.player.move(where);
        this.rerender();
    }

    public loseGame(): void {
        alert(TEXT.YOU_LOST);
        this.designer.toggleButtonStyle();
        // this.clear();
        this.player = null;
        this.gameOver = true;
    }

    private handleStartButtonClick(): void {
        this.clear();
        if (!this.gameOver) {
            this.gameOver = true;
        } else {
            this.start();
        }
        this.rerender();
    }

    private rerender() {
        this.designer.updateCanvas(this.data);
    }

    private clear() {
        this.data = getMatrix();
        this.rerender();
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
