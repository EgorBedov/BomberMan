import {DATA} from 'Interfaces';
import {EMPTY_MAP_INDEX, MAPS} from 'Constants';

const dataSymbol = Symbol('The only data symbol');
const dataCreatorSymbol = Symbol('The only thing that can create data')

class Data {
    public static data: DATA;
    public static map_id: number;

    constructor(creator: symbol | any) {
        if (creator !== dataCreatorSymbol) {
            throw 'Instantiation failed: use dataSymbol.instance instead of new()';
        }

        const id = EMPTY_MAP_INDEX;
        Data.data = JSON.parse(JSON.stringify(MAPS[id]));
        Data.map_id = id;
    }

    static setData(id: number): void {
        if (!this[dataSymbol]) this[dataSymbol] = new Data(dataCreatorSymbol);
        Data.data = JSON.parse(JSON.stringify(MAPS[id]));
        Data.map_id = id;
    }

    static get width(): number {
        if (!this[dataSymbol]) this[dataSymbol] = new Data(dataCreatorSymbol);
        return Data.data[0].length;
    }

    static get height(): number {
        if (!this[dataSymbol]) this[dataSymbol] = new Data(dataCreatorSymbol);
        return Data.data.length;
    }

    static get game_width(): number {
        return this.width * 40;
    }

    static get game_height(): number {
        return this.height * 40;
    }
}

export default Data;
