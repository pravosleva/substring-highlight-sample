import { combineReducers } from 'redux'
import { citylist } from './citylist'
import { toaster } from './toaster'

export const rootReducer = combineReducers({
  citylist,
  toaster,
})
