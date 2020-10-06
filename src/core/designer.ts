import {BASE_SELECTOR, ENEMIES_IDS, ENEMY_ID, TEXT, UNIT_HEIGHT, UNIT_WIDTH} from 'Constants';
import Data from 'Core/data';
import {removeAllChildrenFrom} from 'Utils/htmlHelpers';
import {buttonHandlerArgument, ImageType} from 'Interfaces';
import BombIcon from 'Static/icons/bomb.svg';
import Player1Icon from 'Static/icons/player1.svg';
import Player2Icon from 'Static/icons/player2.svg';
import EnemyIcon from 'Static/icons/enemy.svg';
import BrickIcon from 'Static/icons/brick.svg';
import NoBrickIcon from 'Static/icons/no_brick.svg';
import WallIcon from 'Static/icons/wall.svg';
import FireIcon from 'Static/icons/fire.svg';
import BombAddIcon from 'Static/icons/bomb_add.svg';
import PowerAddIcon from 'Static/icons/power_add.svg';
import SpeedAddIcon from 'Static/icons/speed_add.svg';
import ErrorIcon from 'Static/icons/404.svg';

type IProps = {
    onKeyPress: (ev: KeyboardEvent) => void,
    onKeyUp: (ev: KeyboardEvent) => void,
    onButtonClick: (type: buttonHandlerArgument) => void,
};

class Designer {
    public static images: {
        player1?: ImageType,
        player2?: ImageType,
        enemy?: ImageType,
        brick?: ImageType,
        wall?: ImageType,
        no_brick?: ImageType,
        fire?: ImageType,
        bomb?: ImageType,
        bomb_add?: ImageType,
        power_add?: ImageType,
        speed_add?: ImageType,
        error?: ImageType,
    } = {};

    private table: HTMLTableElement;
    private props: IProps;
    private button: HTMLButtonElement;
    private playersButton: HTMLButtonElement;
    private mapsButton: HTMLButtonElement;
    private enemiesButton: HTMLButtonElement;
    private canvas: HTMLCanvasElement;
    private cells: any[];
    ctx: CanvasRenderingContext2D;

    constructor(props: IProps) {
        this.table = null;
        this.props = props;

        const app = document.querySelector(BASE_SELECTOR);
        this.button = app.querySelector('.button_start');
        this.mapsButton = app.querySelector('.button_map');
        this.playersButton = app.querySelector('.button_players');
        this.enemiesButton = app.querySelector('.button_enemies');
        this.canvas = app.querySelector('#canvas');
        this.ctx = this.canvas.getContext('2d');

        // Initialize images
        [this.button, this.mapsButton, this.playersButton, this.enemiesButton]
            .forEach(btn => btn.addEventListener('click', this.handleButtonClick.bind(this)));

        document.addEventListener('keyup', (ev) => {this.props.onKeyUp(ev);});

        [
            {name: 'player1', icon: Player1Icon},
            {name: 'player2', icon: Player2Icon},
            {name: 'enemy', icon: EnemyIcon},
            {name: 'brick', icon: BrickIcon},
            {name: 'wall', icon: WallIcon},
            {name: 'no_brick', icon: NoBrickIcon},
            {name: 'fire', icon: FireIcon},
            {name: 'bomb', icon: BombIcon},
            {name: 'bomb_add', icon: BombAddIcon},
            {name: 'power_add', icon: PowerAddIcon},
            {name: 'speed_add', icon: SpeedAddIcon},
            {name: 'error', icon: ErrorIcon},
        ].forEach(img => {
            const tmp_image = new Image();
            tmp_image.onload = () => {
                const tmp_canvas = document.createElement('canvas');
                tmp_canvas.width = UNIT_WIDTH;
                tmp_canvas.height = UNIT_HEIGHT;
                const tmp_ctx = tmp_canvas.getContext('2d');
                tmp_ctx.drawImage(tmp_image, 0, 0);
                Designer.images[img.name] = tmp_canvas;
            };
            tmp_image.src = img.icon;
        });
    }

    public resizeCanvas(height: number, width: number): void {
        this.canvas.height = height;
        this.canvas.width = width;
    }

    public clearCanvas(): void {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
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
