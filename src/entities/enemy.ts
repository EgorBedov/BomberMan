import Game from 'Core/game';
import Player from './player';
import {getRandomInt} from 'Utils/utils';
import {DOWN, LEFT, RIGHT, UP} from 'Constants';
import Designer from 'Core/designer';


export default class Enemy extends Player {
    private lastTime: number;

    constructor(g: Game, index: number) {
        super(g, index);
        this.image = Designer.images.enemy || Designer.images.error;
        this.lastTime = 0;
    }

    public work(deltaTime: number): void {
        if (this.lastTime < 0) {
            this.lastTime = 1000;
            this.stop(null);
            if (getRandomInt(3)) {
                if (getRandomInt(3)) this.move(UP);
                else this.move(DOWN);
            }
            if (getRandomInt(3)) {
                if (getRandomInt(3)) this.move(LEFT);
                else this.move(RIGHT);
            }
        } else {
            this.lastTime -= deltaTime;
        }

        super.work(deltaTime);
    }
}
