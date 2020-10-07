import Designer from 'Core/designer';
import {
    DOWN, UP, LEFT, RIGHT, MAPS,
    PLAYER_1_ID, PLAYER_2_ID,
    OBSTACLES, UNIT_HEIGHT, UNIT_WIDTH, BASIC_MAP_INDEX,
} from 'Constants';
import Data from 'Core/data';
import {buttonHandlerArgument} from 'Interfaces';
import Obstacle from 'Core/obstacle';
import PlayerNEW from 'Core/playerNEW';
import Level from 'Core/level';
import {_MAPS} from 'Core/levels';
import Fire from 'Core/fire';
import BombNEW from 'Core/bombNEW';
import Bonus from 'Core/bonus';


class Game {
    designer: Designer;
    public gameOver = true;
    private multiplayer = 0;
    private withEnemies = false;
    private map_index: number;
    public playersNEW: Array<PlayerNEW> = [];
    // public enemies: Array<Enemy> = [];
    public obstacles: Array<Obstacle> = [];
    public bombs: Array<BombNEW> = [];
    public fires: Array<Fire> = [];
    public bonuses: Array<Bonus> = [];
    public level: Level;

    constructor() {
        this.config();
        this.initAll();
        this.rerender();
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
        this.playersNEW[0].stop(where);
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
            this.playersNEW[0].plantBomb();
            break;
        case 'ShiftRight':
        case 'AltRight':
        case 'ControlRight':
        case 'Numpad0':
            if (this.multiplayer) this.playersNEW[1].plantBomb();
            break;
        }

        if (this.multiplayer && ev.code.includes('Arrow')) {
            this.playersNEW[1].move(where);
        } else {
            this.playersNEW[0].move(where);
        }
    }

    public endGame(): void {
        this.gameOver = true;
    }

    public start(): void {
        this.gameOver = false;
    }

    private config(): void {
        this.map_index = BASIC_MAP_INDEX;
        this.level = new Level(_MAPS[this.map_index]);
        this.designer = new Designer({
            onKeyPress: this.handleKeyPress.bind(this),
            onKeyUp: this.handleKeyUp.bind(this),
            onButtonClick: this.handleButtonClick.bind(this),
        });
    }

    private handleButtonClick(type: buttonHandlerArgument): void {
        if (type === 'start') {
            this.initAll();
            if (this.gameOver) {
                this.start();
            } else {
                this.endGame();
            }
            this.designer.toggleButton('start', this.gameOver);
            this.rerender();
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
        this.rerender();
    }

    private rerender() {
        // this.designer.updateTable();
    }

    private initAll() {
        this.buildLevel();
        this.initPlayers();
    }

    // private initEnemies(): void {
    //     this.stopEnemies();
    //     this.enemies = [];
    //     if (this.withEnemies) {
    //         for (let iii = this.players.length; iii < MAX_PLAYERS; iii++) {
    //             this.enemies.push(new Enemy(iii));
    //         }
    //     }
    // }

    private initPlayers(): void {
        this.playersNEW = [new PlayerNEW(this, 0, false)];
        if (this.multiplayer) {
            this.playersNEW.push(new PlayerNEW(this, 1, false));
        }
        // this.initEnemies();
    }

    public update(deltaTime: number): void {
        if (this.gameOver) return;

        this.bombs.forEach(b => b.work(deltaTime));
        this.fires.forEach(f => f.work(deltaTime));
        this.playersNEW.forEach(u => u.work(deltaTime));

        this.bombs = this.bombs.filter(b => !b.toRemove);
        this.fires = this.fires.filter(f => !f.toRemove);
        this.playersNEW = this.playersNEW.filter(u => !u.toRemove);
        this.obstacles = this.obstacles.filter(u => !u.toRemove);

        this.bonuses.forEach(b => b.work(deltaTime));
        this.bonuses = this.bonuses.filter(b => !b.toRemove);

        if (this.playersNEW.filter(p => !p.enemy).length <= 0) this.gameOver = true;
    }

    public draw(): void {
        this.playersNEW.forEach(u => u.draw());
        this.obstacles.forEach(o => o.draw());
        this.bombs.forEach(b => b.draw());
        this.fires.forEach(f => f.draw());
        this.bonuses.forEach(b => b.draw());
    }

    public buildLevel(): void {
        this.obstacles = [];
        this.level = new Level(_MAPS[this.map_index]);
        this.designer.resizeCanvas(this.level.HEIGHT, this.level.WIDTH);
        this.designer.clearCanvas();
        this.level.map.forEach((row, rowIndex) => {
            row.forEach((id, idIndex) => {
                if (!OBSTACLES.includes(id)) return;
                const pos = {
                    x: idIndex * UNIT_WIDTH,
                    y: rowIndex * UNIT_HEIGHT,
                };
                this.obstacles.push(new Obstacle(this, pos, id));
            })
        });
    }
}

export default Game;
