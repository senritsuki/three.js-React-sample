import * as lib from './lib';
import * as World from './World';
import * as Algeol from './Algeol';

const world = new World.World();

world.addObjects(Algeol.prism());
world.addObjects(World.buildLights());

let updated = false;

export function startAnimate(canvasId: string) {
    const renderer = World.buildRenderer(canvasId);
    if (!renderer) return;

    const animate = function () {
        requestAnimationFrame(animate);
        world.animate();
        if (updated) {
            updated = false;
            world.render(renderer);
        }
    };
    animate();
}

export function updateCamera(pos: lib.Vector3, rot: lib.Vector3): void {
    world.updateCamera(pos, rot);
    updated = true;
}
