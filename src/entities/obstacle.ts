import Unit from 'Core/units/unit';
import Game from 'Core/game';
import {Boundaries, POINT} from 'Interfaces';
import Designer from 'Core/designer';
import {BRICK_ID, NO_BLOCK_ID, WALL_ID} from 'Constants';
import {getCenter} from 'Utils/utils';

export default class Obstacle extends Unit {
    public readonly type_id: number;
    public readonly center: POINT;
    public readonly bounds: Boundaries;

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
        this.center = getCenter(this.pos);
        this.bounds = new Boundaries(this, null);
    }
}
