import { take, fork, cancel } from 'redux-saga/effects';
import rootSaga from './index';

const sagas = [rootSaga];

export const CANCEL_SAGAS_HMR = 'CANCEL_SAGAS_HMR';

function createAbortableSaga(saga: any) {
    if (process.env.NODE_ENV === 'development') {
        return function* main() {
            const sagaTask = yield fork(saga);
            yield take(CANCEL_SAGAS_HMR);
            yield cancel(sagaTask);
        };
    }
    return saga;
}

const SagaManager = {
    startSagas(sagaMiddleware: any) {
        sagas.map(createAbortableSaga).forEach(saga => sagaMiddleware.run(saga));
    },
    cancelSagas(store: any) {
        store.dispatch({
            type: CANCEL_SAGAS_HMR,
        });
    },
};

export default SagaManager;
