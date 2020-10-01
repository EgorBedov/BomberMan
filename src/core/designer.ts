import {WIDTH, HEIGHT, TEXT} from 'Constants';
import Data from 'Core/data';

type IProps = {
    onBtnClick: () => void,
    onKeyPress: (ev: KeyboardEvent) => void,
    onPlayersBtnClick: () => void,
};

class Designer {
    private table: HTMLTableElement;
    private props: IProps;
    private button: HTMLButtonElement;
    private playersButtons: HTMLButtonElement;

    constructor(props: IProps) {
        this.table = null;
        this.props = props;

        this.init();
    }

    public init(): void {
        const app = document.querySelector('#application');
        this.button = app.querySelector('.button_start');
        this.button.addEventListener('click', this.handleStartButtonClick.bind(this));

        this.playersButtons = app.querySelector('.button_players');
        this.playersButtons.addEventListener('click', this.handlePlayersButtonClick.bind(this))

        this.table = app.insertAdjacentElement('beforeend', Designer.createTable()) as HTMLTableElement;
        document.body.addEventListener('keydown', this.props.onKeyPress);
        document.addEventListener('keydown', (ev) => ev.code === 'Enter' && this.handleStartButtonClick.call(this))
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
        elem.className = 'button';
        return elem;
    }

    private handleStartButtonClick(): void {
        this.toggleStartButtonStyle();
        this.props.onBtnClick();
    }

    private handlePlayersButtonClick(): void {
        this.playersButtons.blur();
        this.props.onPlayersBtnClick();
    }

    public togglePlayersButtonStyle() : void {
        this.playersButtons.innerText = this.playersButtons.innerText === '1' ? '2' : '1';
    }

    public toggleStartButtonStyle(): void {
        this.button.blur();
        if (this.button.innerText === TEXT.BEGIN) {
            this.button.innerText = TEXT.END;
        } else {
            this.button.innerText = TEXT.BEGIN;
        }
        this.button.classList.toggle('button_start');
    }

    public updateCanvas(): void {
        const d = Data.data;
        const rows = this.table.rows;
        for (let iii = 0; iii < HEIGHT; iii++) {
            const row = rows.item(iii);
            for (let jjj = 0; jjj < WIDTH; jjj++) {
                row.cells.item(jjj).className = `cell cell_${d[iii][jjj]}`;
            }
        }
    }
}

export default Designer;
