import Designer from 'Core/designer';
import {DATA, moveFuncArgs} from 'Interfaces';
import {getMatrix} from 'Utils/utils';
import Player from 'Core/player';


class SV {
    private designer: Designer;
    private data: DATA;
    private gameOver: boolean;
    private player: Player;

    constructor() {
        this.clear();
        this.player = new Player(this.data);
        this.designer = new Designer(this.data, this.move.bind(this));
    }

    public start(): void {
        this.clear();
        this.rerender();
    }

    public move(where: moveFuncArgs): void {
        this.player.move(where);
        this.rerender();
    }

    private rerender() {
        this.designer.updateCanvas();
    }

    private clear() {
        this.gameOver = false;
        this.data = getMatrix();
    }
}

export default SV;
