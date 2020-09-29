import {HEIGHT, WIDTH} from 'Constants';
import {DATA} from 'Interfaces';

export const getMatrix = function(width: number = WIDTH, height: number = HEIGHT): DATA {
    const tmpArray = [];
    for (let iii = 0; iii < height; iii++) {
        tmpArray.push([]);
        for (let jjj = 0; jjj < width; jjj++) {
            tmpArray[iii].push(0);
        }
    }
    return tmpArray;
}
