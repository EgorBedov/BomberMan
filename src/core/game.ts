import Designer from 'Core/designer';
import {
    DOWN, UP, LEFT, RIGHT,
    OBSTACLES, UNIT_HEIGHT, UNIT_WIDTH,
} from 'Constants';
import {buttonHandlerArgument} from 'Interfaces';
import Obstacle from '../entities/obstacle';
import Player from '../entities/player';
import Level from '../level/level';
import {BASIC_MAP_NAME} from '../level/levels';
import Fire from '../entities/fire';
import Bomb from '../entities/bomb';
import Bonus from '../entities/bonus';


class Game {
    designer: Designer;
    public gameOver = true;
    private multiplayer = 0;
    private withEnemies = false;
    public players: Array<Player> = [];
    // public enemies: Array<Enemy> = [];
    public obstacles: Array<Obstacle> = [];
    public bombs: Array<Bomb> = [];
    public fires: Array<Fire> = [];
    public bonuses: Array<Bonus> = [];
    public level: Level;
    public levelName: string;

    constructor() {
        this.designer = new Designer(this);
        this.levelName = BASIC_MAP_NAME;
        this.buildLevel();
        this.initAll();
    }

    public handleKeyUp(ev: KeyboardEvent): void {
        if (this.gameOver) return;

        // prettify
        switch (ev.code) {
        case 'KeyW':    this.players[0].stop(UP);     break;
        case 'KeyS':    this.players[0].stop(DOWN);   break;
        case 'KeyD':    this.players[0].stop(RIGHT);  break;
        case 'KeyA':    this.players[0].stop(LEFT);   break;
        case 'ArrowUp':     this.multiplayer && this.players[1].stop(UP);     break;
        case 'ArrowDown':   this.multiplayer && this.players[1].stop(DOWN);   break;
        case 'ArrowRight':  this.multiplayer && this.players[1].stop(RIGHT);  break;
        case 'ArrowLeft':   this.multiplayer && this.players[1].stop(LEFT);   break;
        }
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
        }
    }

    public endGame(): void {
        this.draw();
        this.gameOver = true;
        this.designer.toggleButton('start', this.gameOver);
    }

    public start(): void {
        this.gameOver = false;
        this.designer.toggleButton('start', this.gameOver);
        this.initAll();
    }

    public handleButtonClick(type: buttonHandlerArgument): void {
        if (type === 'start') {
            this.initAll();
            if (this.gameOver) {
                this.start();
            } else {
                this.endGame();
            }
            this.designer.toggleButton('start', this.gameOver);
            this.initAll();
            return;
        }
        if (!this.gameOver) return;
        switch (type) {
        case 'enemies':
            this.withEnemies = !this.withEnemies;
            this.designer.toggleButton('enemies', this.withEnemies);
            break;
        case 'players':
            this.multiplayer = this.multiplayer === 0 ? 1 : 0;
            this.designer.toggleButton('players', this.multiplayer + 1);
            break;
        default: return;
        }
        this.initAll();
    }

    public handleImageClick(img: HTMLImageElement): void {
        if (!this.gameOver) return;
        img.classList.add('active');
        this.levelName = img.getAttribute('data-name');
        this.buildLevel();
    }

    private initAll() {
        this.initPlayers();
        this.buildLevel();
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
        this.players = [new Player(this, 0, false)];
        if (this.multiplayer) {
            this.players.push(new Player(this, 1, false));
        }
        // this.initEnemies();
    }

    public update(deltaTime: number): void {
        if (this.gameOver) return;

        this.bombs.forEach(b => b.work(deltaTime));
        this.fires.forEach(f => f.work(deltaTime));
        this.players.forEach(u => u.work(deltaTime));

        this.bombs = this.bombs.filter(b => !b.toRemove);
        this.fires = this.fires.filter(f => !f.toRemove);
        this.players = this.players.filter(u => !u.toRemove);
        this.obstacles = this.obstacles.filter(u => !u.toRemove);

        this.bonuses.forEach(b => b.work(deltaTime));
        this.bonuses = this.bonuses.filter(b => !b.toRemove);

        if (this.players.filter(p => !p.enemy).length <= 0) this.endGame();
    }

    public draw(): void {
        if (this.gameOver) return;
        this._draw();
    }

    private _draw(): void {
        this.designer.clearCanvas();
        this.players.forEach(u => u.draw());
        this.obstacles.forEach(o => o.draw());
        this.bombs.forEach(b => b.draw());
        this.fires.forEach(f => f.draw());
        this.bonuses.forEach(b => b.draw());
    }

    public buildLevel(): void {
        this.obstacles = [];
        this.fires = [];
        this.bonuses = [];
        this.level = new Level(this.levelName);
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
        this._draw();
    }
}

export default Game;
