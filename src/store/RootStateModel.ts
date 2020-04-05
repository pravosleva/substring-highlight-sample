import { Store } from 'redux'
import { ToastModel, UremontReviewModel } from '../actions'

export interface RootStateModel extends Store {
  citylist: string[]
  toaster: {
    items: ToastModel[]
  }
  uremont: {
    reviews: {
      isLoading: boolean
      items: UremontReviewModel[]
      pagination: {
        totalCount: number
        pagesCount: number
        pageSize: number
      }
    }
  }
}
