import Player from 'Core/player';
import {getInitEnemyPosBy, getRandomInt} from 'Utils/utils';
import {DIRECTIONS, ENEMIES_IDS} from 'Constants';

class Enemy extends Player {
    private loop: NodeJS.Timeout;
    constructor(index: number) {
        super(ENEMIES_IDS[index]);
        this.pos = getInitEnemyPosBy(index);
    }

    public start(): void {
        this.loop = setInterval(() => {this.live();}, 1000);
    }

    public stop(): void {
        clearInterval(this.loop);
    }

    private live(): void {
        for (let iii = 0; iii < 4; iii++) {
            if (this.move(DIRECTIONS[getRandomInt(DIRECTIONS.length)])) break;
        }
        // console.log('i am '+this.id, ' and i am alive!!!!!!1');
    }
}

export default Enemy;
