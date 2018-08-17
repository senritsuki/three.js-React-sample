import * as React from 'react';
import * as lib from './lib';
import { Slider } from 'office-ui-fabric-react/lib/Slider';

export interface StateValue {
    pos: lib.Vector3;
    rot: lib.Vector3;
}

export interface Props extends StateValue {
    updatePosX: (n: number) => void;
    updatePosY: (n: number) => void;
    updatePosZ: (n: number) => void;
    updateRotX: (n: number) => void;
    updateRotY: (n: number) => void;
    updateRotZ: (n: number) => void;
}

export function initState(): StateValue {
    return {
        pos: new lib.Vector3(0, 0, 10),
        rot: new lib.Vector3(0, 0, 0),
    }
}

const DP = 0.5;
const DR = 5.0;

export class ThreeUI extends React.Component<Props, {}> {
    public render() {
        return (
            <div className="ThreeUI">
                {slider('camera.pos.x', -20, 20, this.props.pos.x, DP, n => this.props.updatePosX(n))}
                {slider('camera.pos.y', -20, 20, this.props.pos.y, DP, n => this.props.updatePosY(n))}
                {slider('camera.pos.z', -20, 20, this.props.pos.z, DP, n => this.props.updatePosZ(n))}
                <div>{this.props.pos.toString()}</div>
                {slider('camera.rot.y (yaw)', -180, 180, this.props.rot.y, DR, n => this.props.updateRotX(n))}
                {slider('camera.rot.x (pitch)', -90, 90, this.props.rot.x, DR, n => this.props.updateRotY(n))}
                {slider('camera.rot.z (roll)', -180, 180, this.props.rot.z, DR, n => this.props.updateRotZ(n))}
                <div>{this.props.rot.toString()}</div>
            </div>
        );
    }
}

function slider(label: string, min: number, max: number, def: number, step: number, callback: (n: number) => void): JSX.Element {
    return (
        <Slider
            label={label}
            min={min}
            max={max}
            step={step}
            value={def}
            showValue={true}
            onChange={value => callback(value)}
        />
    );
}

const KC_A = 65;
const KC_C = 65;
const KC_D = 68;
const KC_I = 73;
const KC_J = 74;
const KC_K = 75;
const KC_L = 76;
const KC_Q = 81;
const KC_S = 83;
const KC_V = 86;
const KC_W = 87;
const KC_X = 88;
const KC_Z = 90;

let restore: StateValue = initState();

export function updateWithKeyCode(st: StateValue, keyCode: number): StateValue {
    switch (keyCode) {
        case KC_X:
            st = initState();
            break;
        case KC_C:
            restore = st;
            break;
        case KC_V:
            st = restore;
            break;
    }
    return {
        pos: updatePosWithKeyCode(st.pos, st.rot, keyCode),
        rot: updateRotWithKeyCode(st.rot, keyCode),
    };
}

function updatePosWithKeyCode(pos: lib.Vector3, rot: lib.Vector3, keyCode: number): lib.Vector3 {
    const rx = rot.x * Math.PI / 180;
    const ry = rot.y * Math.PI / 180;
    const dy = Math.sin(rx);    // 上
    const dh = Math.cos(rx);
    const dx2 = DP * -Math.sin(ry);   // 右
    const dz2 = DP * -Math.cos(ry);   // 手前
    const dy3 = DP * dy;
    const dx3 = dh * dx2;
    const dz3 = dh * dz2;
    switch (keyCode) {
        // 左右
        case KC_A: return pos.add(dz2, 0, -dx2);
        case KC_D: return pos.add(-dz2, 0, dx2);
        // 上下
        case KC_Q: return pos.add(0, DP, 0);
        case KC_Z: return pos.add(0, -DP, 0);
        // 前後
        case KC_W: return pos.add(dx3, dy3, dz3);
        case KC_S: return pos.add(-dx3, -dy3, -dz3);
    }
    return pos;
}

function updateRotWithKeyCode(rot: lib.Vector3, keyCode: number): lib.Vector3 {
    switch (keyCode) {
        // y: yaw
        case KC_J: return rot.add(0, DR, 0);
        case KC_L: return rot.add(0, -DR, 0);
        // x: pitch
        case KC_I: return rot.add(DR, 0, 0);
        case KC_K: return rot.add(-DR, 0, 0);
    }
    return rot;
}
