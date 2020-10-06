import Unit from 'Core/unit';
import {DOWN, LEFT, moveHandlerArgument, RIGHT, UP} from 'Constants';
import Game from 'Core/game';
import {collide} from 'Utils/utils';
import {Boundaries} from 'Interfaces';


export default class MovableUnit extends Unit {
    private maxSpeed = 30;
    private speed: { x: number, y: number };

    constructor(g: Game) {
        super(g, null);
        this.speed = { x:0, y:0 };
        this.posi = {x: g.level.WIDTH / 2 - this.w / 2, y: g.level.HEIGHT / 2 - this.h / 2};
    }

    public move(where: moveHandlerArgument): void {
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
        }
    }

    public work(deltaTime: number): void {
        const prevPos = {...this.posi};
        this.posi.x += this.speed.x / deltaTime;
        this.posi.y += this.speed.y / deltaTime;

        if (this.posi.x < 0) this.posi.x = 0;
        if (this.posi.x > this.game.level.WIDTH - this.w) this.posi.x = this.game.level.WIDTH - this.w;
        if (this.posi.y < 0) this.posi.y = 0;
        if (this.posi.y > this.game.level.HEIGHT - this.h) this.posi.y = this.game.level.HEIGHT - this.h;

        for (let iii = 0; iii < this.game.obstacles.length; iii++) {
            const direction = this.collide(this.game.obstacles[iii]);
            if (direction) {
                switch (direction) {
                case UP:
                    this.posi.y = prevPos.y;
                    break;
                case DOWN:
                    this.posi.y = prevPos.y;
                    break;
                case LEFT:
                    this.posi.x = prevPos.x;
                    break;
                case RIGHT:
                    this.posi.x = prevPos.x;
                    break;
                }
            }
        }
    }

    public collide(u: Unit): moveHandlerArgument | null {
        const sides1 = new Boundaries(this);
        const sides2 = new Boundaries(u);
        const diffs: Array<{dir: moveHandlerArgument, diff: number}> = [
            {dir: UP, diff: sides2.bottom - sides1.top},
            {dir: DOWN, diff: sides1.bottom - sides2.top},
            {dir: LEFT, diff: sides2.right - sides1.left},
            {dir: RIGHT, diff: sides1.right - sides2.left},
        ];

        if (!(sides1.top <= sides2.bottom &&
            sides1.bottom >= sides2.top &&
            sides1.left <= sides2.right &&
            sides1.right >= sides2.left)) return null;

        diffs.sort((a, b) => a.diff - b.diff);
        return diffs[0].dir;
    }
}
