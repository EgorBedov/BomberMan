import Designer from 'Core/designer';
import Player from 'Core/player';
import {
    DIRECTIONS,
    EMPTY_MAP_INDEX, MAPS, MAX_PLAYERS,
    PLAYER_1_ID, PLAYER_2_ID, PLAYER_IDS,
    TEXT,
} from 'Constants';
import Bomb from 'Core/bomb';
import Data from 'Core/data';
import Enemy from 'Core/enemy';


class SV {
    private designer: Designer;
    private gameOver = true;
    private multiplayer = false;
    private withEnemies = false;
    private enemies: Array<Enemy> = [];
    private players: Array<Player> = [];
    private map_index: number;

    constructor() {
        this.config();
        this.initAll();
        this.renderAll();
    }

    public handleKeyPress(ev: KeyboardEvent): void {
        if (this.gameOver) return;

        let where;
        switch (ev.code) {
        case 'KeyW':
        case 'ArrowUp':
            where = DIRECTIONS[0];
            break;
        case 'ArrowLeft':
        case 'KeyA':
            where = DIRECTIONS[2];
            break;
        case 'ArrowRight':
        case 'KeyD':
            where = DIRECTIONS[3];
            break;
        case 'ArrowDown':
        case 'KeyS':
            where = DIRECTIONS[1];
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
    }

    public endGame(): void {
        this.gameOver = true;
        this.stopEnemies();
    }

    public start(): void {
        this.gameOver = false;
        this.enemies.forEach(e => {e.start();});
    }

    private config(): void {
        this.map_index = EMPTY_MAP_INDEX;
        this.designer = new Designer({
            onKeyPress: this.handleKeyPress.bind(this),
            onBtnClick: this.handleStartButtonClick.bind(this),
            onPlayersBtnClick: this.handlePlayersButtonClick.bind(this),
            onMapsBtnClick: this.handleMapsButtonClick.bind(this),
            onEnemiesBtnClick: this.handleEnemiesButtonClick.bind(this),
        });
        Player.rerender = Bomb.rerender = this.rerender.bind(this);
        Player.killPlayer = Bomb.killPlayer = this.killPlayer.bind(this);
    }

    private killPlayer(player_id: number): void {
        if (this.withEnemies && !PLAYER_IDS.includes(player_id)) {
            this.enemies.find(e => e.id === player_id).alive = false;
        } else {
            this.players.find((p) => p.id === player_id).alive = false;
        }
        let enemies_alive = 0;
        this.enemies.forEach(e => {if (e.alive) enemies_alive++;});
        let players_alive = 0;
        this.players.forEach(p => {if (p.alive) players_alive++;});
        if (this.multiplayer) {
            if (players_alive + enemies_alive === 1) {
                alert(this.players.find((p) => p.alive === true).id + TEXT.YOU_WIN);
                this.endGame();
            }
        } else if (players_alive === 0) {
            alert('Игрок номер ' + this.players.find((p) => p.id === player_id).id + TEXT.YOU_LOST);
            this.endGame();
        } else if (enemies_alive === 0) {
            alert(this.players.find((p) => p.alive === true).id + TEXT.YOU_WIN);
            this.endGame();
        }
    }

    private handleStartButtonClick(): void {
        this.initAll();
        if (this.gameOver) {
            this.start();
        } else {
            this.endGame();
        }
        this.designer.toggleStartButtonStyle(this.gameOver);
        this.renderAll();
    }

    private handlePlayersButtonClick(): void {
        if (!this.gameOver) return;
        this.designer.togglePlayersButtonStyle();
        this.multiplayer = !this.multiplayer;
        this.initAll();
        this.renderAll();
    }

    private handleMapsButtonClick(): void {
        if (!this.gameOver) return;
        this.map_index++;
        if (this.map_index === MAPS.length) {
            this.map_index = 0;
        }
        this.designer.toggleMapsButtonStyle(this.map_index);
        this.initAll();
        this.renderAll();
    }

    private handleEnemiesButtonClick(): void {
        if (!this.gameOver) return;
        this.withEnemies = !this.withEnemies;
        this.designer.toggleEnemiesButtonStyle(this.withEnemies);
        this.initAll();
        this.renderAll();
    }

    private renderPlayers(): void {
        this.players.forEach(p => p.setSelf());
    }

    private renderEnemies(): void {
        this.enemies.forEach(p => p.setSelf());
    }

    private renderAll(): void {
        this.renderPlayers();
        this.renderEnemies();
        this.rerender();
    }

    private rerender() {
        this.designer.updateCanvas();
    }

    private initAll(): void {
        this.initPlayers();
        this.initMap();
    }

    private initMap() {
        Data.setData(this.map_index);
        this.designer.initTable();
        this.initPlayers();
    }

    private initEnemies(): void {
        this.stopEnemies();
        this.enemies = [];
        if (this.withEnemies) {
            for (let iii = this.players.length; iii < MAX_PLAYERS; iii++) {
                this.enemies.push(new Enemy(iii));
            }
        }
    }

    private initPlayers(): void {
        this.players = [new Player(PLAYER_1_ID)];
        if (this.multiplayer) {
            this.players.push(new Player(PLAYER_2_ID));
        }
        this.initEnemies();
    }

    private stopEnemies(): void {
        this.enemies.forEach(e => {e.stop();});
    }
}

export default SV;
