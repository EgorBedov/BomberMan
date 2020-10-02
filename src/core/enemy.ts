import Player from 'Core/player';
import {getInitEnemyPosBy} from 'Utils/utils';
import {ENEMIES_IDS} from 'Constants';

class Enemy extends Player {
    constructor(index: number) {
        super(ENEMIES_IDS[index]);
        this.pos = getInitEnemyPosBy(index);
    }

    public start(): void {
        setInterval(() => {this.live();}, 500);
    }

    private live(): void {
        console.log('i am '+this.id, ' and i am alive!!!!!!1');
    }
}

export default Enemy;
