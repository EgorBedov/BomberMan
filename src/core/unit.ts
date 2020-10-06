import Game from 'Core/game';
import {ImageType, POINT} from 'Interfaces';
import {UNIT_HEIGHT, UNIT_WIDTH} from 'Constants';


export default class Unit {
    // TODO: it (removed to make player smaller)
    public /*readonly*/ w = UNIT_WIDTH;
    public /*readonly*/ h = UNIT_HEIGHT;
    posi: POINT;
    protected game: Game;
    public toRemove: boolean;
    protected image: ImageType;

    constructor(game: Game, pos: POINT, image: ImageType = null) {
        this.game = game;
        this.posi = pos;
        this.toRemove = false;
        this.image = image;
    }

    public draw(): void {
        this.game.designer.ctx.fillStyle = '#ffffff';
        this.game.designer.ctx.fillRect(this.posi.x, this.posi.y, this.w, this.h);
    }

    public work(deltaTime: number): void {
        this.posi.x += 5 / deltaTime;
    }
}
