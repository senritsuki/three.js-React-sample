import * as three from '../algeol/decoder/three';
import * as ob from '../algeol/object/object';
import * as prim from '../algeol/object/primitive';
import * as Prism from '../algeol/geometry/primitive3/prism';

export function vf(vf: ob.VF): THREE.Mesh[] {
    const obj = ob.obj_single_vf(vf, null, null);
    three.useBlenderCoordinateSystem();
    return three.buildMeshes(obj, []);
}

export const octahedron = () => vf(prim.regular_octahedron());
export const prism = () => vf(Prism.vf(6, 0.5, 3));
