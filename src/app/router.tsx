import * as React from 'react';
import { Router, Route, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';
import App from './containers';
import configureStore from './store/configureStore';

declare var module: any;
declare var require: any;

export const store: any = configureStore({});
export const history = syncHistoryWithStore(browserHistory, store);

export const getStore = () => {
  return store;
};

const Appx = React.createClass({
  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <Route path="/" component={App} />
          <Route path="/Snake_React_v2" component={App} />
        </Router>
      </Provider>
    );
  }
});
export default Appx;
