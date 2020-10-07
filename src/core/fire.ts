import Game from 'Core/game';
import {POINT} from 'Interfaces';
import Designer from 'Core/designer';
import TemporaryUnit from 'Core/temporaryUnit';


export default class Fire extends TemporaryUnit {
    constructor(g: Game, pos: POINT) {
        super(g, pos, Designer.images.fire || Designer.images.error);
        this.timer = 100;
    }

    public work(deltaTime: number): void {
        super.work(deltaTime);
        if (this.timer < 0) {
            this.remove();
        }
    }
}
