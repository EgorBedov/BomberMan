import Designer from 'Core/designer';
import Player from 'Core/player';
import {
    DOWN, UP, LEFT, RIGHT,
    EMPTY_MAP_INDEX, MAPS, MAX_PLAYERS,
    PLAYER_1_ID, PLAYER_2_ID, PLAYER_IDS,
    TEXT, UNIT_SIZE, OBSTACLES,
} from 'Constants';
import Bomb from 'Core/bomb';
import Data from 'Core/data';
import Enemy from 'Core/enemy';
import {buttonHandlerArgument} from 'Interfaces';
import MovableUnit from 'Core/movableUnit';
import Unit from 'Core/unit';
import Obstacle from 'Core/obstacle';


class Game {
    designer: Designer;
    private gameOver = true;
    private multiplayer = 0;
    private withEnemies = false;
    private enemies: Array<Enemy> = [];
    private players: Array<Player> = [];
    private map_index: number;
    private units: Array<MovableUnit> = [];
    public WIDTH: number;
    public HEIGHT: number;
    public obstacles: Array<Unit>;

    constructor() {
        this.config();
        this.initAll();
        this.renderAll();
    }

    public handleKeyUp(ev: KeyboardEvent): void {
        if (this.gameOver) return;

        let where;
        switch (ev.code) {
        case 'KeyW':    where = UP;     break;
        case 'KeyS':    where = DOWN;   break;
        case 'KeyD':    where = RIGHT;  break;
        case 'KeyA':    where = LEFT;   break;
        }
        this.units[0].stop(where);
    }

    public handleKeyPress(ev: KeyboardEvent): void {
        if (this.gameOver) return;

        let where;
        switch (ev.code) {
        case 'KeyW':
        case 'ArrowUp':     where = UP;         break;

        case 'ArrowLeft':
        case 'KeyA':        where = LEFT;       break;

        case 'ArrowRight':
        case 'KeyD':        where = RIGHT;      break;

        case 'ArrowDown':
        case 'KeyS':        where = DOWN;       break;

        case 'Space':
        case 'MetaLeft':
            this.players[0].plantBomb();
            break;
        case 'ShiftRight':
        case 'AltRight':
        case 'ControlRight':
        case 'Numpad0':
            if (this.multiplayer) this.players[1].plantBomb();
            break;
        }

        if (this.multiplayer && ev.code.includes('Arrow')) {
            this.players[1].move(where);
        } else {
            this.players[0].move(where);
            this.units[0].move(where);
        }
    }

    public endGame(): void {
        this.gameOver = true;
        this.stopEnemies();
        this.designer.toggleButton('start', this.gameOver);
    }

    public start(): void {
        this.gameOver = false;
        this.enemies.forEach(e => {e.start();});
        this.designer.toggleButton('start', this.gameOver);
    }

    private config(): void {
        this.map_index = EMPTY_MAP_INDEX;
        this.designer = new Designer({
            onKeyPress: this.handleKeyPress.bind(this),
            onKeyUp: this.handleKeyUp.bind(this),
            onButtonClick: this.handleButtonClick.bind(this),
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
            if (players_alive === 1 && enemies_alive === 0) {
                this.designer.showEndMessage('Игрок номер ' + this.players.find((p) => p.alive === true).id + ' ' + TEXT.YOU_WIN);
                this.endGame();
            } else if (players_alive === 0 && enemies_alive > 0) {
                this.designer.showEndMessage('PHP wins!')
                this.endGame();
            }
        } else if (players_alive === 0) {
            this.designer.showEndMessage('Игрок номер ' + this.players.find((p) => p.id === player_id).id + ' ' + TEXT.YOU_LOST);
            this.endGame();
        } else if (enemies_alive === 0) {
            this.designer.showEndMessage('Игрок номер ' + this.players.find((p) => p.alive === true).id + ' ' + TEXT.YOU_WIN);
            this.endGame();
        }
    }

    private handleButtonClick(type: buttonHandlerArgument): void {
        if (type === 'start') {
            this.initAll();
            if (this.gameOver) {
                this.start();
            } else {
                this.endGame();
            }
            this.renderAll();
            return;
        }
        if (!this.gameOver) return;
        switch (type) {
        case 'enemies':
            this.withEnemies = !this.withEnemies;
            this.designer.toggleButton('enemies', this.withEnemies);
            break;
        case 'maps':
            this.map_index++;
            if (this.map_index === MAPS.length) {
                this.map_index = 0;
            }
            this.designer.toggleButton('maps', this.map_index);
            break;
        case 'players':
            this.multiplayer = this.multiplayer === 0 ? 1 : 0;
            this.designer.toggleButton('players', this.multiplayer + 1);
            break;
        default: return;
        }
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
        this.designer.updateTable();
    }

    private initAll(): void {
        this.initPlayers();
        this.initMap();
    }

    private initMap() {
        this.buildLevel();

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
        this.units = [new MovableUnit(this)];
        this.players = [new Player(PLAYER_1_ID)];
        if (this.multiplayer) {
            this.players.push(new Player(PLAYER_2_ID));
        }
        this.initEnemies();
    }

    private stopEnemies(): void {
        this.enemies.forEach(e => {e.stop();});
    }

    public update(deltaTime: number): void {
        this.units.forEach(u => u.work(deltaTime));
        this.units.filter(u => !u.toRemove);
    }

    public draw(): void {
        this.units.forEach(u => u.draw());
        this.obstacles.forEach(o => o.draw());
    }

    public buildLevel(): void {
        const map = MAPS[this.map_index];
        this.HEIGHT = map.length * UNIT_SIZE;
        this.WIDTH = map[0].length * UNIT_SIZE;
        this.designer.resizeCanvas(this.HEIGHT, this.WIDTH);
        this.obstacles = [];
        this.designer.clearCanvas();
        map.forEach((row, rowIndex) => {
            row.forEach((id, idIndex) => {
                if (!OBSTACLES.includes(id)) return;
                const pos = {
                    x: idIndex * UNIT_SIZE,
                    y: rowIndex * UNIT_SIZE,
                };
                this.obstacles.push(new Obstacle(this, pos, id));
            })
        });
    }
}

export default Game;
