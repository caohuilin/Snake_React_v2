/// <reference path="../../../typings/index.d.ts" />

import {createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from '../reducers/index';
import sagaManager from '../sagas/sagaManager';
import logger from '../middleware/logger';

declare var module: any;
export default function configureStore(initialState: any) {
  const create = (window as any).devToolsExtension ? (window as any).devToolsExtension()(createStore) : createStore;
  const sagaMiddleware = createSagaMiddleware();
  const createStoreWithMiddleware = applyMiddleware(logger, sagaMiddleware)(create);

  const store = createStoreWithMiddleware(rootReducer, initialState);
  sagaManager.startSagas(sagaMiddleware);
  if (module.hot) {
    // enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = rootReducer;
      store.replaceReducer(nextReducer);
    });
  }
  return store;
}
