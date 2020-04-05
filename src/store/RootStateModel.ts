import { Store } from 'redux'

export interface RootStateModel extends Store {
  citylist: string[]
}
