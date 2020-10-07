import Unit from 'Core/units/unit';
import Game from 'Core/game';
import {ImageType, POINT} from 'Interfaces';


export default class TemporaryUnit extends Unit {
    protected timer: number;

    constructor(g: Game, pos: POINT | null, img: ImageType | null) {
        super(g, pos, img);
    }

    public work(deltaTime: number): void {
        this.timer -= deltaTime;
    }
}
