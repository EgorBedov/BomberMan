import Unit from 'Core/unit';
import {DOWN, LEFT, moveHandlerArgument, RIGHT, UP} from 'Constants';
import Data from 'Core/data';


export default class MovableUnit extends Unit {
    private maxSpeed = 5;
    public HSpeed = 0;
    public VSpeed = 0;

    constructor() {
        super();
    }

    public move(where: moveHandlerArgument): void {
        switch (where) {
        case UP:        this.VSpeed = -this.maxSpeed;      break;
        case DOWN:      this.VSpeed = +this.maxSpeed;      break;
        case LEFT:      this.HSpeed = -this.maxSpeed;      break;
        case RIGHT:     this.HSpeed = +this.maxSpeed;      break;
        }
    }

    public stop(where: moveHandlerArgument): void {
        switch (where) {
        case UP:        if (this.VSpeed < 0) this.VSpeed = 0;   break;
        case DOWN:      if (this.VSpeed > 0) this.VSpeed = 0;   break;
        case LEFT:      if (this.HSpeed < 0) this.HSpeed = 0;   break;
        case RIGHT:     if (this.HSpeed > 0) this.HSpeed = 0;   break;
        }
    }

    public work(deltaTime: number): void {
        if (!deltaTime) return;
        this.posi.x += this.HSpeed / deltaTime;
        this.posi.y += this.VSpeed / deltaTime;

        if (this.posi.x < 0) this.posi.x = 0;
        if (this.posi.x > Data.game_width - this.w) this.posi.x = Data.game_width - this.w;
        if (this.posi.y < 0) this.posi.y = 0;
        if (this.posi.y > Data.game_height - this.h) this.posi.y = Data.game_height - this.h;
    }
}
