import {WIDTH, HEIGHT} from "Constants";

export type Person = {
    name: string,
    surname: string,
}

export type Setup = {
    stack: string[],
    link: string,
}

export type Contribution = {
    icon: string,
    title: string,
    message: string,
    link: string,
}

export type POS = {
    row: number,
    column: number,
};

// type DATA_ROW = [number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number];
// export type DATA = [Array<DATA_ROW>, Array<DATA_ROW>, Array<DATA_ROW>, Array<DATA_ROW>, Array<DATA_ROW>, Array<DATA_ROW>, Array<DATA_ROW>, Array<DATA_ROW>, Array<DATA_ROW>, Array<DATA_ROW>];

export type DATA = any;
