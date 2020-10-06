import Unit from 'Core/unit';
import Game from 'Core/game';

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

export type buttonHandlerArgument = 'maps' | 'enemies' | 'players' | 'start';

export type ImageType = HTMLCanvasElement;

export class Boundaries {
    public top: number;
    public right: number;
    public bottom: number;
    public left: number;

    constructor(u: Unit) {
        this.top = u.posi.y;
        this.bottom = u.posi.y + u.h;
        this.left = u.posi.x;
        this.right = u.posi.x + u.w;
    }
}
