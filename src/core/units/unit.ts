import Game from 'Core/game';
import {Boundaries, ImageType, POINT} from 'Interfaces';
import {UNIT_HEIGHT, UNIT_WIDTH} from 'Constants';
import {getCenter, getClosestAreaStartingPoint} from 'Utils/utils';


export default class Unit {
    // TODO: it (removed to make player smaller)
    public /*readonly*/ w = UNIT_WIDTH;
    public /*readonly*/ h = UNIT_HEIGHT;
    pos: POINT;
    protected game: Game;
    public toRemove: boolean;
    protected image: ImageType;
    public readonly center: POINT;

    constructor(game: Game, pos: POINT, image: ImageType = null) {
        this.game = game;
        this.pos = pos;
        this.toRemove = false;
        this.image = image;
        this.center = getCenter(this.pos);
    }

    public draw(): void {
        if (this.image) {
            this.game.designer.ctx.drawImage(this.image, this.pos.x, this.pos.y);
        } else {
            this.game.designer.ctx.fillStyle = '#ffffff';
            this.game.designer.ctx.fillRect(this.pos.x, this.pos.y, this.w, this.h);
        }
    }

    public work(deltaTime: number): void {
        return;
    }

    public remove(): void {
        this.toRemove = true;
    }

    public blockIAmIn(): Boundaries {
        return new Boundaries(null, {...getClosestAreaStartingPoint(this.center), w: UNIT_WIDTH, h: UNIT_HEIGHT});
    }
}
