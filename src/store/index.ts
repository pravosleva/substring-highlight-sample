import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import logger from 'redux-logger'
import { RootStateModel } from './RootStateModel'

import { rootReducer } from './reducers'
import { rootSaga } from './sagas'

const sagaMiddleware = createSagaMiddleware()

declare global {
  interface Window {
    fetch: (url: string, options?: {}) => Promise<any>
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any
  }
}
const composeEnhancers =
  (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ trace: true, traceLimit: 25 })) ||
  compose

export const store: RootStateModel = createStore(rootReducer, composeEnhancers(applyMiddleware(logger, sagaMiddleware)))

sagaMiddleware.run(rootSaga)
