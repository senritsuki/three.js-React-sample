import * as lib from './lib';
import { buildRenderer } from './World';
import { SimpleWorld } from './WorldSimple';

const world: SimpleWorld = new SimpleWorld();

export function startAnimate(canvasId: string) {
    const renderer = buildRenderer(canvasId);
    if (!renderer) return;

    const animate = function () {
        requestAnimationFrame(animate);
        world.animate();
        world.render(renderer);
    };
    animate();
}

export function updateCamera(pos: lib.Vector3, rot: lib.Vector3): void {
    world.updateCamera(pos, rot);
}
