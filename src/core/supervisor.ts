import Designer from 'Core/designer';
import {DATA} from 'Interfaces';
import {getMatrix} from 'Utils/utils';


class SV {
    private designer: Designer;
    private data: DATA;
    private gameOver: boolean;

    constructor() {
        this.clear();
        this.designer = new Designer(null, null, null, null, null);
    }

    private clear() {
        this.gameOver = false;
        this.data = getMatrix();
    }

    public start(): void {
        this.clear();
        this.rerender();
    }

    private rerender() {
        this.designer.updateCanvas(this.data);
    }
}

export default SV;
