import Unit from 'Core/unit';
import {UNIT_HEIGHT, UNIT_WIDTH} from 'Constants';

export type POS = {
    row: number,
    col: number,
};

export type FireArea = Array<POS>;

export type moveFunc =  (where: string) => void;

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
        this.top    = u && u.posi.y         || a && a.y         || 0;
        this.left   = u && u.posi.x         || a && a.x         || 0;
        this.bottom = u && u.posi.y + u.h   || a && a.y + a.h   || UNIT_HEIGHT;
        this.right  = u && u.posi.x + u.w   || a && a.x + a.w   || UNIT_WIDTH;
    }
}
