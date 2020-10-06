import Unit from 'Core/unit';
import Game from 'Core/game';
import {POINT} from 'Interfaces';
import Designer from 'Core/designer';
import {BRICK_ID, NO_BLOCK_ID, WALL_ID} from 'Constants';

export default class Obstacle extends Unit {
    public type_id: number;

    constructor(game: Game, pos: POINT, type_id: number) {
        let img = Designer.images.error;
        switch (type_id) {
        case WALL_ID:
            img = Designer.images.wall;
            break;
        case BRICK_ID:
            img = Designer.images.brick;
            break;
        case NO_BLOCK_ID:
            img = Designer.images.no_brick;
            break;
        }
        super(game, pos, img);
        this.type_id = type_id;
    }

    public draw(): void {
        this.game.designer.ctx.drawImage(this.image, this.posi.x, this.posi.y);
    }
}
