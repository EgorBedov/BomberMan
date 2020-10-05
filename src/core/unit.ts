import Data from 'Core/data';
import Designer from 'Core/designer';


export default class Unit {
    protected readonly w = 20;
    protected readonly h = 20;
    protected posi: {
        x: number,
        y: number,
    };

    constructor() {
        this.w = 20;
        this.h = 20;
        this.posi = {x: Data.game_width / 2 - this.w / 2, y: Data.game_height / 2 - this.h / 2};
    }

    public draw(): void {
        Designer.ctx.fillStyle = '#ffffff';
        Designer.ctx.fillRect(this.posi.x, this.posi.y, this.w, this.h);
    }

    public work(deltaTime: number): void {
        if (!deltaTime) return;
        this.posi.x += 5 / deltaTime;
    }
}
