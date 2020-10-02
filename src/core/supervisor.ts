import Designer from 'Core/designer';
import {moveFuncArgs} from 'Interfaces';
import Player from 'Core/player';
import {
    EMPTY_MAP_INDEX, MAPS,
    PLAYER_1_ID,
    PLAYER_2_ID,
    TEXT,
} from 'Constants';
import Bomb from 'Core/bomb';
import Data from 'Core/data';
import {getInitPosByPlayerId} from 'Utils/utils';


class SV {
    private designer: Designer;
    private gameOver = true;
    private multiplayer = false;
    private players: Array<Player> = [];
    private map_index: number;

    constructor() {
        this.config();
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
        this.map_index = EMPTY_MAP_INDEX;
        this.designer = new Designer({
            onKeyPress: this.handleKeyPress.bind(this),
            onBtnClick: this.handleStartButtonClick.bind(this),
            onPlayersBtnClick: this.handlePlayersButtonClick.bind(this),
            onMapsBtnClick: this.handleMapsButtonClick.bind(this),
        });
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

    private handleMapsButtonClick(): void {
        if (!this.gameOver) return;
        this.map_index++;
        if (this.map_index === MAPS.length) {
            this.map_index = 0;
        }
        this.designer.toggleMapsButtonStyle(this.map_index);
        this.initMap();
    }

    private initPlayers(): void {
        this.initMap();
        this.players = [new Player(PLAYER_1_ID, {killPlayer: this.killPlayer.bind(this)})];
        if (this.multiplayer) {
            this.players.push(new Player(PLAYER_2_ID, {killPlayer: this.killPlayer.bind(this)}));
        }
    }

    private renderPlayers(): void {
        this.players.forEach(p => {
            p.pos = getInitPosByPlayerId(p.id);
            p.setSelf();
        })
    }

    private rerender() {
        this.designer.updateCanvas();
    }

    private initMap() {
        Data.setData(this.map_index);
        this.designer.initTable();
        this.renderPlayers();
        this.rerender();
    }
}

export default SV;
