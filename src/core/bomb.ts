import {FireArea, POS} from 'Interfaces';
import SV from 'Core/supervisor';
import {
    BRICK_ID,
    FIRE_ID,
    PLAYERS_ON_MAP,
} from 'Constants';
import {
    getBombIdByPlayerId,
    getBombOnPLayerIdByPlayerId,
    getFireOnPlayerIdBy,
    getFireOnPlayerIdByPlayerId,
    getPlayerId
} from 'Utils/utils';
import Data from 'Core/data';


class Bomb {
    public static rerender: () => void;
    public static killPlayer: (player_id: number) => void;

    private readonly pos: { col: number; row: number };
    private readonly power: number;
    private readonly player_id: number;
    private readonly icon_id: number;

    constructor(player_id: number, pos: POS, power: number) {
        this.player_id = player_id;
        this.icon_id = getBombIdByPlayerId(player_id);
        this.pos = {...pos};
        this.power = power;
        Data.data[pos.row][pos.col] = getBombOnPLayerIdByPlayerId(player_id);
        setTimeout(() => {this.startBoom();}, 2000);
    }

    private startBoom(): void {
        const fire: FireArea = [this.pos];

        for (let iii = 0; iii < 4; iii++) {
            for (let jjj = 1; jjj < this.power + 1; jjj++) {
                const tmp_pos = {...this.pos};
                switch (iii) {
                case 0:     tmp_pos.row += jjj;     break;
                case 1:     tmp_pos.row -= jjj;     break;
                case 2:     tmp_pos.col += jjj;     break;
                case 3:     tmp_pos.col -= jjj;     break;
                }

                if (!SV.canPlace(FIRE_ID, tmp_pos, Data.data)) break;
                fire.push({...tmp_pos});
                if (Data.data[tmp_pos.row][tmp_pos.col] === BRICK_ID) break;
            }
        }

        let player_killed = 0;
        fire.forEach((fire_pos) => {
            if (PLAYERS_ON_MAP.includes(Data.data[fire_pos.row][fire_pos.col])) {
                Data.data[fire_pos.row][fire_pos.col] = getFireOnPlayerIdBy(Data.data[fire_pos.row][fire_pos.col]);
                player_killed = getPlayerId(Data.data[fire_pos.row][fire_pos.col]);
            } else {
                Data.data[fire_pos.row][fire_pos.col] = FIRE_ID;
            }
        });
        Bomb.rerender();
        if (player_killed) {
            Bomb.killPlayer(player_killed);
        } else {
            setTimeout(() => {this.endBoom(fire);}, 2000);
        }
    }

    private endBoom(fire: FireArea): void {
        fire.forEach((fire_pos) => Data.data[fire_pos.row][fire_pos.col] = 0);
        Bomb.rerender();
    }
}

export default Bomb;
