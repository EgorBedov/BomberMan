import './main.scss';
import Game from 'Core/game';

const game = new Game();

let lastTime = 0;
function gameLoop(timestamp: number): void {
    const deltaTime = timestamp - lastTime;
    lastTime = timestamp;

    game.designer.ctx.clearRect(0, 0, game.WIDTH, game.HEIGHT);
    game.update(deltaTime);
    game.draw();

    requestAnimationFrame(gameLoop);
}
requestAnimationFrame(gameLoop);
