import Game from 'Core/game';
import {Boundaries, POINT} from 'Interfaces';
import Designer from 'Core/designer';
import TemporaryUnit from 'Core/units/temporaryUnit';
import {boundsIntersect, getBonus, pointInBounds} from 'Utils/utils';
import {UNIT_HEIGHT, UNIT_WIDTH} from 'Constants';
import Bonus from './bonus';


export default class Fire extends TemporaryUnit {
    private readonly replacedObstacle: boolean;
    private readonly bounds: Boundaries;

    constructor(g: Game, pos: POINT, replacedObstacle: boolean) {
        super(g, pos, Designer.images.fire || Designer.images.error);
        this.replacedObstacle = replacedObstacle;
        this.timer = 500;
        this.bounds = new Boundaries(null, {h: UNIT_HEIGHT, w: UNIT_WIDTH, ...this.pos});
    }

    public work(deltaTime: number): void {
        this.game.players.forEach(p => boundsIntersect(new Boundaries(p, null), this.bounds) && p.remove());
        this.game.enemies.forEach(e => boundsIntersect(new Boundaries(e, null), this.bounds) && e.remove());
        super.work(deltaTime);
        if (this.timer < 0) {
            this.remove();
        }
    }

    public remove(): void {
        if (this.toRemove) return;
        super.remove();
        if (!this.replacedObstacle) return;
        const bonus = getBonus();
        if (bonus) this.game.bonuses.push(new Bonus(this.game, {...this.pos}, bonus));
    }
}
