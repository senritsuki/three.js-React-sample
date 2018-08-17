import * as THREE from 'three';
import * as lib from './lib';

export class World {
    public scene: THREE.Scene = new THREE.Scene();
    public camera: THREE.PerspectiveCamera = buildCamera();

    constructor() {
        this.scene.background = new THREE.Color(0xffffff);
    }

    addObjects(objects: THREE.Object3D[]): void {
        objects.forEach(mesh => this.scene.add(mesh));
    }

    animate(): boolean {
        //this.cube.rotation.x += 0.01;
        //this.cube.rotation.y += 0.01;
        return true;
    }

    updateCamera(pos: lib.Vector3, rot: lib.Vector3): void {
        this.camera.position.x = pos.x;
        this.camera.position.y = pos.y;
        this.camera.position.z = pos.z;
        this.camera.rotation.x = rot.x * Math.PI / 180;
        this.camera.rotation.y = rot.y * Math.PI / 180;
        this.camera.rotation.z = rot.z * Math.PI / 180;
    }

    render(renderer: THREE.WebGLRenderer): void {
        renderer.render(this.scene, this.camera);
    }
}

export function buildCamera(): THREE.PerspectiveCamera {
    const fov = 50;
    const aspect = window.innerWidth / window.innerHeight;
    const near = 0.1;
    const far = 1000;
    const rotOrder = 'YXZ';
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.rotation.order = rotOrder;
    return camera;
}

export function buildCube(): THREE.Mesh {
    const geometry = new THREE.BoxGeometry( 1, 1, 1 );
    const material = new THREE.MeshLambertMaterial( { color: 0x40cf40 } );
    const cube = new THREE.Mesh( geometry, material );
    return cube;
}

export function buildLights(): THREE.Light[] {
    const l1 = new THREE.DirectionalLight(0xffffff, 0.5);
    const l2 = new THREE.DirectionalLight(0xffffff, 0.5);
    l1.position.set(0, 1, 0)
    l2.position.set(1, 0, 0);
    return [
        new THREE.AmbientLight(0x808080),
        l1,
        l2,
    ];
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
