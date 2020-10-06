import {UNIT_HEIGHT, UNIT_WIDTH} from 'Constants';
import {DATA, POINT} from 'Interfaces';
import {LEVELS} from './levels';

export default class Level {
    public readonly name: string;
    public readonly WIDTH: number;
    public readonly HEIGHT: number;
    public readonly map: DATA;
    public readonly positions: Array<POINT>;

    constructor(name: string) {
        this.name = name;
        const map = JSON.parse(JSON.stringify(LEVELS.get(this.name)));
        this.map = map.scheme;
        this.positions = map.positions;
        this.WIDTH = this.map[0].length * UNIT_HEIGHT;
        this.HEIGHT = this.map.length * UNIT_WIDTH;
    }
}
