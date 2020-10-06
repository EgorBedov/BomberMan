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
