import Designer from 'Core/designer';
import {
    DOWN, UP, LEFT, RIGHT,
    OBSTACLES, UNIT_HEIGHT, UNIT_WIDTH, TEXT,
} from 'Constants';
import {buttonHandlerArgument} from 'Interfaces';
import Obstacle from '../entities/obstacle';
import Player from '../entities/player';
import Level from '../level/level';
import {BASIC_MAP_NAME} from '../level/levels';
import Fire from '../entities/fire';
import Bomb from '../entities/bomb';
import Bonus from '../entities/bonus';
import Enemy from '../entities/enemy';


class Game {
    designer: Designer;
    public gameOver = true;
    private multiplayer = 0;
    private withEnemies = false;
    public players: Array<Player> = [];
    public enemies: Array<Enemy> = [];
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
        case 'KeyW':    this.players[0].stop(UP);     return;
        case 'KeyS':    this.players[0].stop(DOWN);   return;
        case 'KeyD':    this.players[0].stop(RIGHT);  return;
        case 'KeyA':    this.players[0].stop(LEFT);   return;
        }
        if (!this.multiplayer || !this.players[1]) return;
        switch (ev.code) {
        case 'ArrowUp':     this.players[1].stop(UP);     break;
        case 'ArrowDown':   this.players[1].stop(DOWN);   break;
        case 'ArrowRight':  this.players[1].stop(RIGHT);  break;
        case 'ArrowLeft':   this.players[1].stop(LEFT);   break;
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
            if (this.multiplayer && this.players[1]) this.players[1].plantBomb();
            break;
        }

        if (this.multiplayer && ev.code.includes('Arrow') && this.players[1]) {
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
        this.initEnemies();
        this.buildLevel();
    }

    private initEnemies(): void {
        this.enemies = [];
        if (this.withEnemies) {
            for (let iii = this.players.length; iii < this.level.positions.length; iii++) {
                this.enemies.push(new Enemy(this, iii));
            }
        }
    }

    private initPlayers(): void {
        this.players = [new Player(this, 0)];
        if (this.multiplayer) {
            this.players.push(new Player(this, 1));
        }
    }

    public update(deltaTime: number): void {
        if (this.gameOver) return;

        this.bombs.forEach(b => b.work(deltaTime));
        this.fires.forEach(f => f.work(deltaTime));
        this.enemies.forEach(e => e.work(deltaTime));
        this.players.forEach(p => p.work(deltaTime));

        this.bombs = this.bombs.filter(b => !b.toRemove);
        this.fires = this.fires.filter(f => !f.toRemove);
        this.enemies = this.enemies.filter(e => !e.toRemove);
        this.players = this.players.filter(p => !p.toRemove);
        this.obstacles = this.obstacles.filter(o => !o.toRemove);

        this.bonuses.forEach(b => b.work(deltaTime));
        this.bonuses = this.bonuses.filter(b => !b.toRemove);

        if (this.multiplayer) {
            if (this.players.length === 1 && this.enemies.length === 0) {
                this.designer.showEndMessage('Игрок ' + this.players[0] + ' ' + TEXT.YOU_WIN);
                this.endGame();
            } else if (this.players.length === 0 && this.enemies.length > 0) {
                this.designer.showEndMessage('PHP wins!')
                this.endGame();
            }
        } else if (this.players.length === 0) {
            this.designer.showEndMessage(TEXT.YOU_LOST);
            this.endGame();
        } else if (this.enemies.length === 0) {
            this.designer.showEndMessage(TEXT.YOU_WIN);
            this.endGame();
        }
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
        this.enemies.forEach(b => b.draw());
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
