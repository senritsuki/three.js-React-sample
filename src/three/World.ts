import * as THREE from 'three';

export interface World {
    animate(): boolean;
    render(renderer: THREE.WebGLRenderer): void;
}

export function buildRenderer(canvasId: string): THREE.WebGLRenderer|null {
    const canvas = document.getElementById(canvasId);
    if (canvas == null) {
        console.log(`#${canvasId} is null`);
        return null;
    }
    if (!(canvas instanceof HTMLCanvasElement)) {
        console.log(`#${canvasId} is not HTMLCanvasElement`);
        return null;
    } 
    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
    });
    renderer.setSize( window.innerWidth, window.innerHeight );
    return renderer;
}
