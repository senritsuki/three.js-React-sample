import * as THREE from 'three';
import * as lib from './lib';
import { World } from './World';

export class SimpleWorld implements World {
    public scene: THREE.Scene = new THREE.Scene();
    public camera: THREE.PerspectiveCamera = buildCamera();

    public cube: THREE.Mesh = buildCube();
    public lights: THREE.Light[] = buildLights();

    constructor() {
        this.scene.add(this.cube);
        this.lights.forEach(light => this.scene.add(light));
        this.scene.background = new THREE.Color(0xffffff);
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
    const camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
    //camera.position.z = 5;
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
