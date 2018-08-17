import * as React from 'react';
import * as ReactDOM from 'react-dom';
//import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

import * as three from './three/ThreeUI';
import * as main from './three/ThreeMain';

export class Root extends React.Component<{}, three.StateValue> {
  constructor(props: three.Props) {
    super(props);
    this.state = three.initState();
    setTimeout(() => {
      this.setState(three.initState());
      main.startAnimate('canvas');
      window.onkeydown = e => this.setState(three.updateWithKeyCode(this.state, e.keyCode));
    }, 1001);
  }
  public render() {
    main.updateCamera(this.state.pos, this.state.rot);
    return (
      <div>
        <canvas id="canvas"></canvas>
        <three.ThreeUI
          pos={this.state.pos}
          rot={this.state.rot}
          updatePosX={n => this.setState({pos: this.state.pos.updateX(n)})}
          updatePosY={n => this.setState({pos: this.state.pos.updateY(n)})}
          updatePosZ={n => this.setState({pos: this.state.pos.updateZ(n)})}
          updateRotX={n => this.setState({rot: this.state.rot.updateX(n)})}
          updateRotY={n => this.setState({rot: this.state.rot.updateY(n)})}
          updateRotZ={n => this.setState({rot: this.state.rot.updateZ(n)})}
        />
      </div>
    );
  }
}

ReactDOM.render(
  <Root />,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
