import 'regenerator-runtime/runtime';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './router';
import { AppContainer } from 'react-hot-loader';
import './index.less';
const root = document.getElementById('root');

ReactDOM.render(
  <AppContainer>
    <App />
  </AppContainer>,
  root
);
declare var module: any;
if (module.hot) {
  module.hot.accept('./router', () => {
    const App = require('./router').default;
    ReactDOM.render(
      <AppContainer>
        <App />
      </AppContainer>,
      root
    );
  });
}
