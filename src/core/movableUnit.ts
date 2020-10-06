import Unit from 'Core/unit';
import {DOWN, LEFT, moveHandlerArgument, RIGHT, UP} from 'Constants';
import Game from 'Core/game';


export default class MovableUnit extends Unit {
    private maxSpeed = 30;
    private speed: { x: number, y: number };

    constructor(g: Game) {
        super(g, null);
        this.speed = { x:0, y:0 };
        this.posi = {x: g.WIDTH / 2 - this.w / 2, y: g.HEIGHT / 2 - this.h / 2};
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
        this.posi.x += this.speed.x / deltaTime;
        this.posi.y += this.speed.y / deltaTime;

        if (this.posi.x < 0) this.posi.x = 0;
        if (this.posi.x > this.game.WIDTH - this.w) this.posi.x = this.game.WIDTH - this.w;
        if (this.posi.y < 0) this.posi.y = 0;
        if (this.posi.y > this.game.HEIGHT - this.h) this.posi.y = this.game.HEIGHT - this.h;
    }
}
