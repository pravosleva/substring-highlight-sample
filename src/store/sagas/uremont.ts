import { put, takeEvery, call } from 'redux-saga/effects'
import {
  ASYNC_LOAD_REVIEW_ITEMS,
  setIsLoadingReviewItems,
  LoadReviewItemsParamsModel,
  addReviewsItems,
  // LoadReviewItemsResponseModel,
} from '../../actions'

export function fetchReviewsData(params: LoadReviewItemsParamsModel) {
  const body = new FormData()
  const expectedFields = ['page', 'review_rating_from', 'review_rating_to']

  expectedFields.forEach((e) => {
    if (params[e]) {
      switch (e) {
        // arrays
        // case 'as-array':
        // params[e].map(e => body.append(`${e}[]`, params[e]))
        // break
        // strings & others
        default:
          body.append(e, params[e])
          break
      }
    }
  })

  return fetch('https://api-frontend.uservice.io/common/default/review-list/', {
    method: 'POST',
    body,
  })
    .then((res) => {
      console.log(res)
      // TODO...

      return res.json()
    })
    .then((json) => {
      console.log(json)

      // TODO...
      return json
    })
    .catch((err) => {
      console.log(err)

      // TODO...
    })
}

export function* asyncLoadReviewItemsWorker(action: any) {
  const { payload } = action

  yield put(setIsLoadingReviewItems(true))

  const data = yield call(fetchReviewsData, payload)

  if (data.reviews && Array.isArray(data.reviews)) {
    yield put(
      addReviewsItems({
        reviews: data.reviews,
        totalCount: data.totalCount,
        pagesCount: data.pagesCount,
        pageSize: data.pageSize,
      })
    )
  }

  yield put(setIsLoadingReviewItems(false))
}

export function* watchAsyncLoadReviewItems() {
  yield takeEvery(ASYNC_LOAD_REVIEW_ITEMS, asyncLoadReviewItemsWorker)
}
