import {WIDTH, HEIGHT, TEXT} from 'Constants';
import {DATA} from 'Interfaces';

type IProps = {
    onBtnClick: () => void,
    onKeyPress: (ev: KeyboardEvent) => void,
};

class Designer {
    private table: HTMLTableElement;
    private props: IProps;
    private button: HTMLButtonElement;

    constructor(data: DATA, props: IProps) {
        this.table = null;
        this.props = props;

        this.init();
    }

    public init(): void {
        const app = document.querySelector('#application');
        this.button = app.insertAdjacentElement('afterbegin', Designer.createButton()) as HTMLButtonElement;
        this.button.addEventListener('click', this.handleButtonClick.bind(this));

        this.table = app.insertAdjacentElement('beforeend', Designer.createTable()) as HTMLTableElement;
        document.body.addEventListener('keydown', this.props.onKeyPress);
    }

    private static createTable(): HTMLTableElement {
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

    private static createButton(): HTMLElement {
        const elem = document.createElement('button');
        elem.className = 'button button_start';
        elem.innerText = TEXT.BEGIN;
        return elem;
    }

    private handleButtonClick(): void {
        this.button.blur();
        if (this.button.innerText === TEXT.BEGIN) {
            this.button.innerText = TEXT.END;
        } else {
            this.button.innerText = TEXT.BEGIN;
        }
        this.button.classList.toggle('button_start');
        this.props.onBtnClick();
    }

    public updateCanvas(data: DATA): void {
        const rows = this.table.rows;
        for (let iii = 0; iii < HEIGHT; iii++) {
            const row = rows.item(iii);
            for (let jjj = 0; jjj < WIDTH; jjj++) {
                row.cells.item(jjj).className = `cell cell_${data[iii][jjj]}`;
            }
        }
    }
}

export default Designer;
