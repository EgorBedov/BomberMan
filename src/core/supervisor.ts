import Designer from 'Core/designer';
import {DATA, moveFuncArgs, POS} from 'Interfaces';
import {getMatrix, isNumberInRange} from 'Utils/utils';
import Player from 'Core/player';
import {
    BOMB_ID, BOMB_ID_2,
    BRICK_ID,
    FIRE_ID, FIRE_ON_BRICK_ID, FIRE_ON_WALL_ID,
    HEIGHT, LAVA_ID, MAKE_NUCLEAR,
    PLAYER_ID,
    SECOND_PLAYER_ID,
    STATIC_MAP,
    TEXT,
    WALL_ID,
    WIDTH
} from 'Constants';
import Bomb from 'Core/bomb';
import Data from 'Core/data';


class SV {
    private designer: Designer;
    private gameOver = true;
    private multiplayer = false;
    private players: Array<Player> = [];

    constructor() {
        this.config();
        this.designer = new Designer({
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
            this.players[0].plantBomb();
            break;
        case 'ShiftRight':
            if (this.multiplayer) this.players[1].plantBomb();
            break;
        }

        if (this.multiplayer && ev.code.includes('Arrow')) {
            this.players[1].move(where);
        } else {
            this.players[0].move(where);
        }

        this.rerender();
    }

    public endGame(): void {
        this.designer.toggleStartButtonStyle();
        this.gameOver = true;
    }

    private config(): void {
        this.initMap();
        Player.rerender = Bomb.rerender = this.rerender.bind(this);
        Bomb.killPlayer = this.killPlayer.bind(this);
    }

    private killPlayer(player_id: number): void {
        this.players.find((p) => p.id === player_id).alive = false;
        let players_alive = 0;
        this.players.forEach(p => {if (p.alive) players_alive++;})
        if (this.multiplayer) {
            if (players_alive === 1) {
                alert(this.players.find((p) => p.id === player_id).id + TEXT.YOU_WIN);
                this.endGame();
            }
        } else if (players_alive === 0) {
            alert('Игрок номер ' + this.players.find((p) => p.id === player_id).id + TEXT.YOU_LOST);
            this.endGame();
        }
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
        this.initMap();
        this.players = [new Player(PLAYER_ID, {killPlayer: this.killPlayer.bind(this)})];
        if (this.multiplayer) {
            this.players.push(new Player(SECOND_PLAYER_ID, {killPlayer: this.killPlayer.bind(this)}));
        }
    }

    private rerender() {
        this.designer.updateCanvas();
    }

    private initMap() {
        Data.data = JSON.parse(JSON.stringify(STATIC_MAP))
    }

    public static canPlace(what: number, pos: POS, data: DATA): boolean {
        let arr: Array<number>;
        switch (what) {
        case SECOND_PLAYER_ID:
        case PLAYER_ID: arr = [PLAYER_ID, SECOND_PLAYER_ID, WALL_ID, BRICK_ID, LAVA_ID, BOMB_ID, BOMB_ID_2, FIRE_ON_WALL_ID, FIRE_ON_BRICK_ID]; break;
        case FIRE_ID:   arr = [WALL_ID, LAVA_ID]; break;
        case MAKE_NUCLEAR:   arr = [LAVA_ID]; break;
        }

        return isNumberInRange(pos.row, 0, HEIGHT-1)
            && isNumberInRange(pos.col, 0, WIDTH-1)
            && !arr.includes(data[pos.row][pos.col]);
    }
}

export default SV;
