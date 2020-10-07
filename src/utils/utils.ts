import {
    ADD_BOMB,
    ADD_POWER, ADD_SPEED,
    MAKE_NUCLEAR,
    UNIT_HEIGHT, UNIT_WIDTH,
} from 'Constants';
import {Boundaries, POINT} from 'Interfaces';
import Unit from 'Core/units/unit';


export const isNumberInRange = function(num: number, min: number, max: number): boolean {
    return num >= min && num <= max;
}

export function getBonus(): number {
    switch (getRandomInt(15)) {
    case 4:
    case 5: return ADD_BOMB;
    case 6:
    case 7: return ADD_POWER;
    case 8:
    case 9: return ADD_SPEED;
    case 10: return MAKE_NUCLEAR;
    default: return 0;
    }
}

export function getRandomInt(max: number): number {
    return Math.floor(Math.random() * Math.floor(max));
}

export function collide(u1: Unit, u2: Unit): boolean {
    const sides1 = new Boundaries(u1, null);
    const sides2 = new Boundaries(u2, null);

    return (sides1.bottom >= sides2.top &&
            sides1.left <= sides2.right &&
            sides1.top <= sides2.bottom &&
            sides1.right >= sides2.left);
}

export function getClosestAreaStartingPoint(center: POINT): POINT {
    // Get square which includes this center
    let x = 0;
    let y = 0;
    while (x + UNIT_WIDTH < center.x) x += UNIT_WIDTH;
    while (y + UNIT_HEIGHT < center.y) y += UNIT_HEIGHT;

    return {x,y};
}

export function getCenter(pos: POINT, w = UNIT_WIDTH, h = UNIT_HEIGHT): POINT {
    return {x: pos.x + w / 2, y: pos.y + h / 2};
}

export function pointInBounds(p: POINT, b: Boundaries): boolean {
    return p.x >= b.left &&
           p.x <= b.right &&
           p.y >= b.top &&
           p.y <= b.bottom;
}

export function boundsIntersect(b1: Boundaries, b2: Boundaries): boolean {
    const points: POINT[] = [
        {x: b1.left,    y: b1.top},
        {x: b1.right,   y: b1.top},
        {x: b1.left,    y: b1.bottom},
        {x: b1.right,   y: b1.bottom},
    ];
    for (let iii = 0; iii < points.length; iii++) {
        if (pointInBounds(points[iii], b2)) return true;
    }
    return false;
}
