import {WIDTH, HEIGHT} from 'Constants';
import {DATA} from 'Interfaces';
import Player from 'Core/player';

class Designer {
    private table: HTMLTableElement;
    private data: DATA;

    constructor(data: DATA, onKeyPress: typeof Player.move) {
        this.data = data;
        this.table = null;
        this._initCanvas(onKeyPress);
    }

    _initCanvas(onKeyPress: typeof Player.move): void {
        this.table = document.querySelector('#application').insertAdjacentElement('afterbegin', this._createTable()) as HTMLTableElement;
        document.body.addEventListener('keydown', (e) => {
            switch (e.code) {
            case 'KeyW':
            case 'ArrowUp':
                onKeyPress('up');
                break;
            case 'ArrowLeft':
            case 'KeyA':
                onKeyPress('left');
                break;
            case 'ArrowRight':
            case 'KeyD':
                onKeyPress('right');
                break;
            case 'ArrowDown':
            case 'KeyS':
                onKeyPress('down');
                break;
            case 'Space':
                break;
            }
        });
    }

    _createTable(): HTMLTableElement {
        const elem = document.createElement('table');
        elem.className = 'base';
        for (let iii = 0; iii < HEIGHT; iii++) {
            const newRow = document.createElement('tr');
            for (let jjj = 0; jjj < WIDTH; jjj++) {
                newRow.appendChild(document.createElement('td'));
            }
            elem.appendChild(newRow);
        }
        return elem;
    }

    updateCanvas(): void {
        const rows = this.table.rows;
        for (let iii = 0; iii < HEIGHT; iii++) {
            const row = rows.item(iii);
            for (let jjj = 0; jjj < WIDTH; jjj++) {
                row.cells.item(jjj).className = `cell-${this.data[iii][jjj]}`;
            }
        }
    }
}

export default Designer;
