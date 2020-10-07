import Unit from 'Core/units/unit';
import {BOTTOM_SIDE, DOWN, LEFT, LEFT_SIDE, moveHandlerArgument, RIGHT, RIGHT_SIDE, TOP_SIDE, UP} from 'Constants';
import Game from 'Core/game';
import {Boundaries, ImageType, POINT} from 'Interfaces';
import {pointInBounds} from 'Utils/utils';


export default class MovableUnit extends Unit {
    maxSpeed = 30;
    private speed: { x: number, y: number };

    constructor(g: Game, pos: POINT | null, img: ImageType | null) {
        super(g, pos, img);
        this.speed = { x:0, y:0 };
    }

    public move(where: moveHandlerArgument): void {
        if (this.game.gameOver) return;
        switch (where) {
        case UP:        this.speed.y = -this.maxSpeed;      break;
        case DOWN:      this.speed.y = +this.maxSpeed;      break;
        case LEFT:      this.speed.x = -this.maxSpeed;      break;
        case RIGHT:     this.speed.x = +this.maxSpeed;      break;
        }
    }

    public stop(where: moveHandlerArgument): void {
        switch (where) {
        case UP:        if (this.speed.y < 0) this.speed.y = 0;   break;
        case DOWN:      if (this.speed.y > 0) this.speed.y = 0;   break;
        case LEFT:      if (this.speed.x < 0) this.speed.x = 0;   break;
        case RIGHT:     if (this.speed.x > 0) this.speed.x = 0;   break;
        default: this.speed = {x:0,y:0};
        }
    }

    public work(deltaTime: number): void {
        this.pos.x += this.speed.x / deltaTime;
        this.pos.y += this.speed.y / deltaTime;

        if (this.pos.x < 0) this.pos.x = 0;
        if (this.pos.x > this.game.level.WIDTH - this.w) this.pos.x = this.game.level.WIDTH - this.w;
        if (this.pos.y < 0) this.pos.y = 0;
        if (this.pos.y > this.game.level.HEIGHT - this.h) this.pos.y = this.game.level.HEIGHT - this.h;

        const points: POINT[] = [
            {x: this.pos.x,            y: this.pos.y,        }, // top left
            {x: this.pos.x + this.w,   y: this.pos.y,        }, // top right
            {x: this.pos.x,            y: this.pos.y + this.h}, // bottom left
            {x: this.pos.x + this.w,   y: this.pos.y + this.h}, // bottom right
        ];

        for (let iii = 0; iii < this.game.obstacles.length; iii++) {
            const sideOfPlayer = this.collideNEW(this.game.obstacles[iii], points);
            switch (sideOfPlayer) {
            case TOP_SIDE:      this.pos.y = this.game.obstacles[iii].bounds.bottom;       break;
            case BOTTOM_SIDE:   this.pos.y = this.game.obstacles[iii].bounds.top - this.h; break;
            case LEFT_SIDE:     this.pos.x = this.game.obstacles[iii].bounds.right;        break;
            case RIGHT_SIDE:    this.pos.x = this.game.obstacles[iii].bounds.left - this.w;break;
            }
        }
    }

    public collideNEW(u: Unit, points: POINT[]): moveHandlerArgument | null {
        const bounds = new Boundaries(u, null);

        // Check all points
        points = points.filter(p => pointInBounds(p, bounds));

        // No points means no connection
        if (points.length === 0) return null;

        // If one point then return the closest side
        if (points.length === 1) {
            const p = points[0];
            const diffs: Array<{dir: moveHandlerArgument, diff: number}> = [
                {dir: BOTTOM_SIDE,     diff: Math.abs(p.y - bounds.top)},
                {dir: TOP_SIDE,  diff: Math.abs(p.y - bounds.bottom)},
                {dir: RIGHT_SIDE,    diff: Math.abs(p.x - bounds.left)},
                {dir: LEFT_SIDE,   diff: Math.abs(p.x - bounds.right)},
            ];
            diffs.sort((a, b) => a.diff - b.diff);
            return diffs[0].dir;
        }

        // If there are two points then decide which side of player is touching the block
        points.forEach(p => { p.x = Math.floor(p.x); p.y = Math.floor(p.y); });
        const p1 = points[0];
        const p2 = points[1];
        if (p1.x === p2.x) {
            if (p1.x === Math.floor(this.pos.x)) return LEFT_SIDE;
            else return RIGHT_SIDE;
        } else if (p1.y === p2.y) {
            if (p1.y === Math.floor(this.pos.y)) return TOP_SIDE;
            else return BOTTOM_SIDE;
        } else {
            console.log('no points with equal coordinates');
            return null;
        }
    }
}
