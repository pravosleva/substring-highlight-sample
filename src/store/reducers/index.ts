import { combineReducers } from 'redux'
import { citylist } from './citylist'
import { toaster } from './toaster'
import { uremont } from './uremont'

export const rootReducer = combineReducers({
  citylist,
  toaster,
  uremont,
})
