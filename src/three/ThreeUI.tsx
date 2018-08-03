import * as React from 'react';
import * as lib from './lib';
import * as main from './ThreeMain';
import { Slider } from 'office-ui-fabric-react/lib/Slider';

interface Props {
}
interface State {
    pos: lib.Vector3;
    rot: lib.Vector3;
}

export class ThreeUI extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            pos: new lib.Vector3(0, 0, 0),
            rot: new lib.Vector3(0, 0, 0),
        }
        main.startAnimate('canvas');
        setTimeout(() => {
            this.setState({pos: this.state.pos.updateZ(10)});
        }, 1002);
    }
    public render() {
        main.updateCamera(this.state.pos, this.state.rot);
        return (
            <div className="ThreeUI">
                {slider('camera.pos.x', -10, 10, this.state.pos.x, 1, n => this.setState({pos: this.state.pos.updateX(n)}))}
                {slider('camera.pos.y', -10, 10, this.state.pos.y, 1, n => this.setState({pos: this.state.pos.updateY(n)}))}
                {slider('camera.pos.z', -10, 10, this.state.pos.z, 1, n => this.setState({pos: this.state.pos.updateZ(n)}))}
                <div>{this.state.pos.toString()}</div>
                {slider('camera.rot.x', 0, 360, this.state.rot.x, 5, n => this.setState({rot: this.state.rot.updateX(n)}))}
                {slider('camera.rot.y', 0, 360, this.state.rot.y, 5, n => this.setState({rot: this.state.rot.updateY(n)}))}
                {slider('camera.rot.z', 0, 360, this.state.rot.z, 5, n => this.setState({rot: this.state.rot.updateZ(n)}))}
                <div>{this.state.rot.toString()}</div>
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
