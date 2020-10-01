import {getMatrix} from 'Utils/utils';
import {DATA} from 'Interfaces';

const dataSymbol = Symbol('The only data symbol');
const dataCreatorSymbol = Symbol('The only thing that can create data')

class Data {
    public static data: DATA;
    private static _data: DATA;

    constructor(creator: symbol | any) {
        if (creator !== dataCreatorSymbol) {
            throw 'Instantiation failed: use dataSymbol.instance instead of new()';
        }

        Data._data = getMatrix();
    }

    get data(): DATA {
        if (!this[dataSymbol]) this[dataSymbol] = new Data(dataCreatorSymbol);
        return Data._data;
    }

    set data(d : DATA) {
        if (!this[dataSymbol]) this[dataSymbol] = new Data(dataCreatorSymbol);
        Data._data = d;
    }
}

export default Data;
