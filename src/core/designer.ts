import {BASE_SELECTOR, ENEMIES_IDS, ENEMY_ID, TEXT} from 'Constants';
import Data from 'Core/data';
import {removeAllChildrenFrom} from 'Utils/htmlHelpers';
import {buttonHandlerArgument} from 'Interfaces';

type IProps = {
    onKeyPress: (ev: KeyboardEvent) => void,
    onKeyUp: (ev: KeyboardEvent) => void,
    onButtonClick: (type: buttonHandlerArgument) => void,
};

class Designer {
    public static ctx: CanvasRenderingContext2D;

    private table: HTMLTableElement;
    private props: IProps;
    private button: HTMLButtonElement;
    private playersButton: HTMLButtonElement;
    private mapsButton: HTMLButtonElement;
    private enemiesButton: HTMLButtonElement;
    private canvas: HTMLCanvasElement;
    private cells: any[];

    constructor(props: IProps) {
        this.table = null;
        this.props = props;

        this.init();
    }

    public init(): void {
        const app = document.querySelector(BASE_SELECTOR);
        this.button = app.querySelector('.button_start');
        this.mapsButton = app.querySelector('.button_map');
        this.playersButton = app.querySelector('.button_players');
        this.enemiesButton = app.querySelector('.button_enemies');
        this.canvas = app.querySelector('#canvas');
        Designer.ctx = this.canvas.getContext('2d');

        [this.button, this.mapsButton, this.playersButton, this.enemiesButton]
            .forEach(btn => btn.addEventListener('click', this.handleButtonClick.bind(this)));

        document.addEventListener('keyup', (ev) => {this.props.onKeyUp(ev);});
    }

    public updateCanvas(): void {
        Designer.ctx.clearRect(0, 0, Data.width * 40, Data.height * 40);
    }

    public initCanvas(): void {
        this.canvas.width = Data.width * 40;
        this.canvas.height = Data.height * 40;
        this.updateCanvas();
    }

    public initTable(): void {
        this.table = document.querySelector('.base') as HTMLTableElement;
        removeAllChildrenFrom(this.table);
        this.createTableIn(this.table);
        this.table.style.width = (Data.width*40).toString() + 'px';
        document.body.addEventListener('keydown', this.props.onKeyPress);

        const rows = this.table.querySelectorAll('tr');
        this.cells = [];
        for (let iii = 0; iii < rows.length; iii++) {
            this.cells.push(rows[iii].querySelectorAll('td'));
        }
        // document.addEventListener('keydown', (ev) => ev.code === 'Enter' && this.handleStartButtonClick.call(this));
    }

    private createTableIn(elem: HTMLTableElement): void {
        elem.className = 'base';
        for (let iii = 0; iii < Data.height; iii++) {
            const newRow = document.createElement('tr');
            for (let jjj = 0; jjj < Data.width; jjj++) {
                newRow.appendChild(document.createElement('td'));
            }
            elem.appendChild(newRow);
        }
    }

    private static createButton(): HTMLElement {
        const elem = document.createElement('button');
        elem.className = 'button';
        return elem;
    }

    private handleButtonClick(ev: Event): void {
        const t = ev.target as HTMLButtonElement;
        t.blur();
        this.props.onButtonClick(t.getAttribute('data-type') as buttonHandlerArgument);
    }

    public toggleButton(type: buttonHandlerArgument, arg: any): void {
        switch (type) {
        case 'start':
            this.button.innerText = arg ? TEXT.BEGIN : TEXT.END;
            this.button.classList.toggle('button_start', arg);
            break;
        case 'enemies':
            this.enemiesButton.innerText = arg ? 'Да' : 'Нет';
            break;
        case 'players':
        case 'maps':
            this[`${type}Button`].innerText = arg.toString();
            break;
        }
    }

    public updateTable(): void {
        const d = Data.data;
        let value = 0;
        for (let iii = 0; iii < Data.height; iii++) {
            for (let jjj = 0; jjj < Data.width; jjj++) {
                value = d[iii][jjj];
                if (ENEMIES_IDS.includes(value)) value = ENEMY_ID;
                this.cells[iii][jjj].className = `cell cell_${value}`;
            }
        }
    }

    public showEndMessage(msg: string): void {
        document.body.insertAdjacentHTML('beforeend', '<div class="end_message__container"><p class="end_message">'+msg+'</p></div>');
        setTimeout(() => {this.removeEndMessage();}, 1500);
    }

    private removeEndMessage(): void {
        document.body.querySelector('.end_message__container').remove();
    }
}

export default Designer;
