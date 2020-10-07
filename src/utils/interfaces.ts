import Unit from 'Core/units/unit';
import {UNIT_HEIGHT, UNIT_WIDTH} from 'Constants';

// type DATA_ROW = [number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number];
// export type DATA = [Array<DATA_ROW>, Array<DATA_ROW>, Array<DATA_ROW>, Array<DATA_ROW>, Array<DATA_ROW>, Array<DATA_ROW>, Array<DATA_ROW>, Array<DATA_ROW>, Array<DATA_ROW>, Array<DATA_ROW>];

export type DATA = any;

export type POINT = {x: number, y: number};
export type Area = POINT & { w: number, h: number };

export type buttonHandlerArgument = 'maps' | 'enemies' | 'players' | 'start';

export type ImageType = HTMLCanvasElement;

export class Boundaries {
    public readonly top: number;
    public readonly right: number;
    public readonly bottom: number;
    public readonly left: number;

    constructor(u: Unit, a: Area) {
        this.top    = u && u.pos.y         || a && a.y         || 0;
        this.left   = u && u.pos.x         || a && a.x         || 0;
        this.bottom = u && u.pos.y + u.h   || a && a.y + a.h   || UNIT_HEIGHT;
        this.right  = u && u.pos.x + u.w   || a && a.x + a.w   || UNIT_WIDTH;
    }
}
