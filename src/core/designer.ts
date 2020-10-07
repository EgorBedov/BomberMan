import {BASE_SELECTOR, TEXT, UNIT_HEIGHT, UNIT_WIDTH} from 'Constants';
import {buttonHandlerArgument, ImageType} from 'Interfaces';
import BombIcon from 'Static/icons/bomb.svg';
import Player1Icon from 'Static/icons/player0.svg';
import Player2Icon from 'Static/icons/player1.svg';
import EnemyIcon from 'Static/icons/enemy.svg';
import BrickIcon from 'Static/icons/brick.svg';
import NoBrickIcon from 'Static/icons/no_brick.svg';
import WallIcon from 'Static/icons/wall.svg';
import FireIcon from 'Static/icons/fire.svg';
import BombAddIcon from 'Static/icons/bomb_add.svg';
import PowerAddIcon from 'Static/icons/power_add.svg';
import SpeedAddIcon from 'Static/icons/speed_add.svg';
import ErrorIcon from 'Static/icons/404.svg';
import NuclearIcon from 'Static/icons/react.svg';

type IProps = {
    onKeyPress: (ev: KeyboardEvent) => void,
    onKeyUp: (ev: KeyboardEvent) => void,
    onButtonClick: (type: buttonHandlerArgument) => void,
};

class Designer {
    public static images: {
        player0?: ImageType,
        player1?: ImageType,
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
        nuclear?: ImageType,
    } = {};

    private props: IProps;
    private button: HTMLButtonElement;
    private playersButton: HTMLButtonElement;
    private mapsButton: HTMLButtonElement;
    private enemiesButton: HTMLButtonElement;
    private canvas: HTMLCanvasElement;
    readonly ctx: CanvasRenderingContext2D;

    constructor(props: IProps) {
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
        document.addEventListener('keydown', this.props.onKeyPress);

        [
            {name: 'player0', icon: Player1Icon},
            {name: 'player1', icon: Player2Icon},
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
            {name: 'nuclear', icon: NuclearIcon},
        ].forEach(img => {
            const tmp_image = new Image();
            const tmp_canvas = document.createElement('canvas');
            tmp_canvas.width = UNIT_WIDTH;
            tmp_canvas.height = UNIT_HEIGHT;
            if (img.name.match(/^((player)|(enemy))/g)) {
                tmp_canvas.width *= 0.6;
                tmp_canvas.height *= 0.6;
            }
            Designer.images[img.name] = tmp_canvas;
            tmp_image.onload = () => {
                Designer.images[img.name].getContext('2d').drawImage(tmp_image, 0, 0);
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

    public showEndMessage(msg: string): void {
        document.body.insertAdjacentHTML('beforeend', '<div class="end_message__container"><p class="end_message">'+msg+'</p></div>');
        setTimeout(() => {this.removeEndMessage();}, 1500);
    }

    private removeEndMessage(): void {
        document.body.querySelector('.end_message__container').remove();
    }
}

export default Designer;
