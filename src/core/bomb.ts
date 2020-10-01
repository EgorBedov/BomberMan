import {FireArea, POS} from 'Interfaces';
import SV from 'Core/supervisor';
import {
    BRICK_ID,
    FIRE_ID, FIRE_ON_BRICK_ID, FIRE_ON_WALL_ID, MAKE_NUCLEAR,
    PLAYERS_ON_MAP, WALL_ID,
} from 'Constants';
import {
    getBombIdByPlayer,
    getBombOnPLayerIdByPlayerId, getBonus,
    getFireOnPlayerIdBy,
    getPlayerId
} from 'Utils/utils';
import Data from 'Core/data';
import Player from 'Core/player';


class Bomb {
    public static rerender: () => void;
    public static killPlayer: (player_id: number) => void;

    private readonly pos: { col: number; row: number };
    private readonly power: number;
    private readonly player: Player;
    private readonly icon_id: number;

    constructor(player: Player, pos: POS, power: number) {
        this.player = player;
        this.icon_id = getBombIdByPlayer(player);
        this.pos = {...pos};
        this.power = power;
        Data.data[pos.row][pos.col] = getBombOnPLayerIdByPlayerId(this.player.id);
        this.player.bombsLeft--;
        Bomb.rerender();
        setTimeout(() => {this.startBoom();}, 2000);
    }

    private startBoom(): void {
        const fire: FireArea = [this.pos];
        const {nuclear} = this.player.abilities;
        const to_check = nuclear ? MAKE_NUCLEAR : FIRE_ID;

        for (let iii = 0; iii < 4; iii++) {
            for (let jjj = 1; jjj < this.power + 1; jjj++) {
                const tmp_pos = {...this.pos};
                switch (iii) {
                case 0:     tmp_pos.row += jjj;     break;
                case 1:     tmp_pos.row -= jjj;     break;
                case 2:     tmp_pos.col += jjj;     break;
                case 3:     tmp_pos.col -= jjj;     break;
                }

                if (!SV.canPlace(to_check, tmp_pos, Data.data)) break;
                fire.push({...tmp_pos});
                if (Data.data[tmp_pos.row][tmp_pos.col] === BRICK_ID) break;
                if (nuclear && Data.data[tmp_pos.row][tmp_pos.col] === WALL_ID) break;
            }
        }

        let player_killed = 0;
        fire.forEach((fire_pos) => {
            let new_value = FIRE_ID;
            const old_value = Data.data[fire_pos.row][fire_pos.col];
            if (PLAYERS_ON_MAP.includes(old_value)) {
                new_value = getFireOnPlayerIdBy(old_value);
                player_killed = getPlayerId(old_value);
            } else if (old_value === BRICK_ID) {
                new_value = FIRE_ON_BRICK_ID
            } else if (nuclear && old_value === WALL_ID) {
                new_value = FIRE_ON_WALL_ID
            }
            Data.data[fire_pos.row][fire_pos.col] = new_value;
        });
        Bomb.rerender();
        this.player.bombsLeft++;
        if (player_killed) {
            Bomb.killPlayer(player_killed);
        } else {
            setTimeout(() => {this.endBoom(fire);}, 1000);
        }
    }

    private endBoom(fire: FireArea): void {
        fire.forEach((fire_pos) => {
            let new_value = 0;
            if (Data.data[fire_pos.row][fire_pos.col] === FIRE_ON_BRICK_ID) {
                new_value = getBonus();
            }
            Data.data[fire_pos.row][fire_pos.col] = new_value;
        });
        Bomb.rerender();
    }
}

export default Bomb;
