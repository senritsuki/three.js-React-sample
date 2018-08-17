
export class Vector3 {
    constructor(
        public x: number,
        public y: number,
        public z: number,
    ) {}

    add(x: number, y: number, z: number): Vector3 {
        return new Vector3(this.x + x, this.y + y, this.z + z);
    }
    updateX(x: number): Vector3 {
        return new Vector3(x, this.y, this.z);
    }
    updateY(y: number): Vector3 {
        return new Vector3(this.x, y, this.z);
    }
    updateZ(z: number): Vector3 {
        return new Vector3(this.x, this.y, z);
    }

    toString(): string {
        return [this.x, this.y, this.z].join(', ');
    }
}
