import Game from 'Core/game';
import {ImageType, POINT} from 'Interfaces';
import {UNIT_SIZE} from 'Constants';


export default class Unit {
    protected readonly w = UNIT_SIZE;
    protected readonly h = UNIT_SIZE;
    protected posi: POINT;
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
