import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import injectTapEventPlugin from 'react-tap-event-plugin';
import App from './App';


injectTapEventPlugin();
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
if (module.hot) {
  module.hot.accept()
  }