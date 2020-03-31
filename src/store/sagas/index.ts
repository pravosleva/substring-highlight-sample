import { all } from 'redux-saga/effects'
import { watchToaster } from './toaster'

// notice how we now only export the rootSaga
// single entry point to start all Sagas at once
export function* rootSaga() {
  yield all([watchToaster()])
}
