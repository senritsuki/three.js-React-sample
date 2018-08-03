import * as React from 'react';
import * as ReactDOM from 'react-dom';
//import App from './App';
import * as three from './three/ThreeUI';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

ReactDOM.render(
  <three.ThreeUI />,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
