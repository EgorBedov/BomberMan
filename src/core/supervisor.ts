import Designer from 'Core/designer';
import {DATA, moveFuncArgs, POS} from 'Interfaces';
import {getMatrix, isNumberInRange} from 'Utils/utils';
import Player from 'Core/player';
import {
    BOMB_ID, BOMB_ID_2,
    BRICK_ID,
    FIRE_ID,
    HEIGHT, LAVA_ID,
    PLAYER_ID,
    SECOND_PLAYER_ID,
    STATIC_MAP,
    TEXT,
    WALL_ID,
    WIDTH
} from 'Constants';


class SV {
    private designer: Designer;
    private data: DATA;
    private gameOver: boolean;
    private player: Player;
    private secondPlayer: Player;
    private multiplayer: boolean;

    constructor() {
        this.gameOver = true;
        this.multiplayer = false;
        this.initMap();
        this.designer = new Designer(this.data, {
            onKeyPress: this.handleKeyPress.bind(this),
            onBtnClick: this.handleStartButtonClick.bind(this),
            onPlayersBtnClick: this.handlePlayersButtonClick.bind(this),
        });
        this.initPlayers();
        this.rerender();
    }

    public start(): void {
        this.initPlayers();
        this.gameOver = false;
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
        case 'ShiftRight':
            if (this.multiplayer) this.secondPlayer.plantBomb();
            break;
        }

        if (this.multiplayer && ev.code.includes('Arrow')) {
            this.secondPlayer.move(where);
        } else {
            this.player.move(where);
        }

        this.rerender();
    }

    public loseGame(player_id: number): void {
        let text = 'Игрок ';
        if (this.multiplayer) {
            text += player_id === 1 ? 2 : 1;
            text += ' ' + TEXT.YOU_WIN;
        } else {
            text += player_id + ' ' + TEXT.YOU_LOST;
        }
        alert(text);
        this.designer.toggleStartButtonStyle();
        this.player = null;
        if (this.multiplayer) this.secondPlayer = null;
        this.gameOver = true;
    }

    private handleStartButtonClick(): void {
        this.initMap();
        if (!this.gameOver) {
            this.gameOver = true;
        } else {
            this.start();
        }
        this.rerender();
    }

    private handlePlayersButtonClick(): void {
        if (!this.gameOver) return;
        this.designer.togglePlayersButtonStyle();
        this.multiplayer = !this.multiplayer;
        this.initPlayers();
        this.rerender();
    }

    private initPlayers(): void {
        this.player = new Player(1, this.data,
            {rerender: this.rerender.bind(this), loseGame: this.loseGame.bind(this)});
        if (this.multiplayer) {
            this.secondPlayer = new Player(2, this.data,
                {rerender: this.rerender.bind(this), loseGame: this.loseGame.bind(this)});
        } else {
            this.secondPlayer = null;
        }
    }

    private rerender() {
        this.designer.updateCanvas(this.data);
    }

    private initMap() {
        this.data = JSON.parse(JSON.stringify(STATIC_MAP))
    }

    public static canPlace(what: number, pos: POS, data: DATA): boolean {
        let arr: Array<number>;
        switch (what) {
        case SECOND_PLAYER_ID:
        case PLAYER_ID: arr = [WALL_ID, BRICK_ID, LAVA_ID, BOMB_ID, BOMB_ID_2];      break;
        case FIRE_ID:   arr = [WALL_ID];                                    break;
        }

        return isNumberInRange(pos.row, 0, HEIGHT-1)
            && isNumberInRange(pos.col, 0, WIDTH-1)
            && !arr.includes(data[pos.row][pos.col]);
    }
}

export default SV;
