/// <reference path="../../../typings/index.d.ts" />

import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers/index';
import logger from '../middleware/logger';

declare var module: any;
export default function configureStore(initialState: any) {
  const create = (window as any).devToolsExtension
    ? (window as any).devToolsExtension()(createStore)
    : createStore;
  const createStoreWithMiddleware = applyMiddleware(logger)(create);

  const store = createStoreWithMiddleware(rootReducer, initialState);
  if (module.hot) {
    // enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = rootReducer;
      store.replaceReducer(nextReducer);
    });
  }
  return store;
}
