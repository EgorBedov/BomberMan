import MovableUnit from 'Core/units/movableUnit';
import Game from 'Core/game';
import Designer from 'Core/designer';
import Bomb from './bomb';
import {getCenter, getClosestAreaStartingPoint, pointInBounds} from 'Utils/utils';
import {Area, Boundaries} from 'Interfaces';
import {UNIT_HEIGHT, UNIT_WIDTH} from 'Constants';


export default class Player extends MovableUnit {
    public bombsLeft: number;
    public power: number;
    public nuclear: boolean;
    public enemy: boolean;

    constructor(g: Game, index: number, enemy: boolean) {
        super(g, g.level.getPosition(index), Designer.images[`player${index}`] || Designer.images.error);
        this.w *= 0.6;
        this.h *= 0.6;
        this.bombsLeft = 2;
        this.nuclear = false;
        this.power = 2;
        this.enemy = enemy;
    }

    public plantBomb(): void {
        if (!this.toRemove && this.bombsLeft > 0) {
            // Check whether this area is blocked by another bomb
            const area: Area = {...getClosestAreaStartingPoint(getCenter(this.pos)), w: UNIT_WIDTH, h: UNIT_HEIGHT}
            const bounds = new Boundaries(null, area);
            if (this.game.bombs.find(b => pointInBounds(b.center, bounds))) return;
            this.bombsLeft--;
            this.game.bombs.push(new Bomb(this.game, getClosestAreaStartingPoint(getCenter(this.pos)), this));
        }
    }
}
