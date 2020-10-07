import Game from 'Core/game';
import {Boundaries, POINT} from 'Interfaces';
import Designer from 'Core/designer';
import TemporaryUnit from 'Core/temporaryUnit';
import {pointInBounds} from 'Utils/utils';
import {UNIT_HEIGHT, UNIT_WIDTH} from 'Constants';


export default class Fire extends TemporaryUnit {
    constructor(g: Game, pos: POINT) {
        super(g, pos, Designer.images.fire || Designer.images.error);
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
}
