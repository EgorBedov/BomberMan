import Game from 'Core/game';
import {Boundaries, POINT} from 'Interfaces';
import Designer from 'Core/designer';
import {ADD_BOMB, ADD_POWER, ADD_SPEED, MAKE_NUCLEAR} from 'Constants';
import Unit from 'Core/units/unit';
import {boundsIntersect, pointInBounds} from 'Utils/utils';

export default class Bonus extends Unit {
    public readonly type_id: number;
    private readonly bounds: Boundaries;

    constructor(g: Game, pos: POINT, type_id: number) {
        super(g, pos, null);
        let img = null;
        switch (type_id) {
        case ADD_BOMB:      img = Designer.images.bomb_add;   break;
        case ADD_SPEED:     img = Designer.images.speed_add;  break;
        case ADD_POWER:     img = Designer.images.power_add;  break;
        case MAKE_NUCLEAR:  img = Designer.images.nuclear;  break;
        }
        this.image = img || Designer.images.error;
        this.type_id = type_id;
        this.bounds = new Boundaries(this, null);
    }

    public work(deltaTime: number): void {
        // Detect collision with player or fire
        const player = this.game.players.find(p => boundsIntersect(new Boundaries(p, null), this.bounds));
        if (player) {
            switch (this.type_id) {
            case ADD_BOMB:      player.bombsLeft++;     break;
            case ADD_POWER:     player.power++;         break;
            case ADD_SPEED:     player.maxSpeed += 5;   break;
            case MAKE_NUCLEAR:  player.nuclear = true;  break;
            }
            this.remove();
        } else if (this.game.fires.find(f => pointInBounds({...f.center}, this.bounds))) {
            this.remove();
        }
    }
}
