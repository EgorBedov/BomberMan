import {WIDTH, HEIGHT} from 'Constants';

class Designer {
    private table: HTMLTableElement;

    constructor(onUp, onLeft, onRight, onDown, onSpace) {
        this.table = null;
        this._initCanvas(onUp, onLeft, onRight, onDown, onSpace);
    }

    _initCanvas(onUp, onLeft, onRight, onDown, onSpace): void {
        this.table = document.querySelector('#application').insertAdjacentElement('afterbegin', this._createTable()) as HTMLTableElement;
        document.body.addEventListener('keydown', (e) => {
            switch (e.code) {
            case 'ArrowLeft':
            case 'KeyA':
                onLeft();
                break;
            case 'ArrowRight':
            case 'KeyD':
                onRight();
                break;
            case 'ArrowDown':
            case 'KeyS':
                onDown();
                break;
            case 'Space':
                onSpace();
                break;
            case 'KeyW':
            case 'ArrowUp':
                onUp();
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

    updateCanvas(data): void {
        const rows = this.table.rows;
        for (let iii = 0; iii < HEIGHT; iii++) {
            const row = rows.item(iii);
            for (let jjj = 0; jjj < WIDTH; jjj++) {
                row.cells.item(jjj).className = `color-${data[iii][jjj] === 0 ? data[iii][jjj] : data[iii][jjj] % 20 + 1}`;
            }
        }
    }
}

export default Designer;
