import Game from 'Core/game';
import {Boundaries, POINT} from 'Interfaces';
import Designer from 'Core/designer';
import TemporaryUnit from 'Core/temporaryUnit';
import Fire from 'Core/fire';
import {BRICK_ID, UNIT_HEIGHT, UNIT_WIDTH, WALL_ID} from 'Constants';
import {pointInBounds} from 'Utils/utils';
import PlayerNEW from 'Core/playerNEW';

export default class BombNEW extends TemporaryUnit {
    public readonly power: number;
    public readonly nuclear: boolean;
    private player: PlayerNEW;

    constructor(g: Game, pos: POINT, p: PlayerNEW) {
        super(g, pos, Designer.images.bomb || Designer.images.error);
        this.timer = 1000;
        this.power = p.power;
        this.nuclear = p.nuclear;
        this.player = p;
    }

    public work(deltaTime: number): void {
        super.work(deltaTime);
        if (this.timer < 0) {
            this.remove();
            this.game.bombs.push(new Fire(this.game, {...this.posi}));

            for (let iii = 0; iii < 4; iii++) {
                for (let jjj = 1; jjj < this.power + 1; jjj++) {
                    const tmp_pos = {...this.posi};
                    switch (iii) {
                    case 0:     tmp_pos.y += jjj * UNIT_HEIGHT;     break;
                    case 1:     tmp_pos.y -= jjj * UNIT_HEIGHT;     break;
                    case 2:     tmp_pos.x += jjj * UNIT_WIDTH;     break;
                    case 3:     tmp_pos.x -= jjj * UNIT_WIDTH;     break;
                    }

                    // Check for canvas boundaries
                    if (this.game.level.startingPointInBounds(tmp_pos)) {
                        this.game.bombs.push(new Fire(this.game, tmp_pos));
                    } else {
                        break;
                    }

                    // Check for collision with blocks and walls
                    const bounds = new Boundaries(null, {h: UNIT_HEIGHT, w: UNIT_WIDTH, ...tmp_pos});
                    const collidedObstacle = this.game.obstacles.find(o => pointInBounds(o.center, bounds));
                    if (collidedObstacle) {
                        if (collidedObstacle.type_id === BRICK_ID ||
                            collidedObstacle.type_id === WALL_ID && this.nuclear) collidedObstacle.remove();
                        break;
                    }
                }
            }
        }
    }

    public remove(): void {
        super.remove();
        this.player.bombsLeft++;
    }
}
