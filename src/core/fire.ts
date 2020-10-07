import Game from 'Core/game';
import {Boundaries, POINT} from 'Interfaces';
import Designer from 'Core/designer';
import TemporaryUnit from 'Core/temporaryUnit';
import {getBonus, pointInBounds} from 'Utils/utils';
import {UNIT_HEIGHT, UNIT_WIDTH} from 'Constants';
import Bonus from 'Core/bonus';


export default class Fire extends TemporaryUnit {
    private readonly replacedObstacle: boolean;

    constructor(g: Game, pos: POINT, replacedObstacle: boolean) {
        super(g, pos, Designer.images.fire || Designer.images.error);
        this.replacedObstacle = replacedObstacle;
        this.timer = 500;
        const bounds = new Boundaries(null, {h: UNIT_HEIGHT, w: UNIT_WIDTH, ...this.posi});
        this.game.playersNEW.forEach(p => pointInBounds({...p.posi}, bounds) && p.remove());
    }

    public work(deltaTime: number): void {
        super.work(deltaTime);
        if (this.timer < 0) {
            this.remove();
        }
    }

    public remove(): void {
        super.remove();
        if (!this.replacedObstacle) return;
        const bonus = getBonus();
        if (bonus) this.game.bonuses.push(new Bonus(this.game, {...this.posi}, bonus));
    }
}
