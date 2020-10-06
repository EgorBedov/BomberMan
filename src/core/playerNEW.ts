import MovableUnit from 'Core/movableUnit';
import Game from 'Core/game';
import Designer from 'Core/designer';

export default class PlayerNEW extends MovableUnit {
    constructor(g: Game, index: number) {
        super(g);
        this.image = Designer.images[`player${index}`] || Designer.images.error;
        this.posi = this.game.level.positions[index];
        this.w *= 0.6;
        this.h *= 0.6;
    }

    public draw(): void {
        this.game.designer.ctx.drawImage(this.image, this.posi.x, this.posi.y);
    }
}
