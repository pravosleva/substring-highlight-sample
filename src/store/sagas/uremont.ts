import { put, takeEvery, call, select } from 'redux-saga/effects'
import {
  ASYNC_LOAD_REVIEW_ITEMS,
  setIsLoadingReviewItems,
  LoadReviewItemsParamsModel,
  addReviewsItems,
  // LoadReviewItemsResponseModel,
  showAsyncToast,
} from '../../actions'
import { RootStateModel } from '../RootStateModel'

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
      // TODO...

      return res.json()
    })
    .then((json) => {
      // TODO...

      // return json
      return {
        success: 0,
        errors: {
          err1: ['txt11', 'txt12', 'txt13'],
          err2: ['txt21', 'txt22', 'txt23'],
          err3: ['txt31', 'txt32', 'txt33'],
        },
      }
    })
    .catch((err) => {
      console.error(err)

      // TODO...

      return {
        reviews: [],
        pagination: {
          totalCount: 0,
          pagesCount: 0,
          pageSize: 0,
        },
      }
    })
}

const getReviewsLength = (state: RootStateModel) => state.uremont.reviews.items.length
export function* asyncLoadReviewItemsWorker(action: any) {
  const { payload } = action

  yield put(setIsLoadingReviewItems(true))

  const data = yield call(fetchReviewsData, payload)

  if (data.success === 1 && data.reviews && Array.isArray(data.reviews)) {
    yield put(
      addReviewsItems({
        reviews: data.reviews,
        pagination: data.pagination,
      })
    )
    const reviewsLength = yield select(getReviewsLength)
    yield put(
      showAsyncToast({
        text: `${reviewsLength} of ${data.pagination.totalCount} received`,
        delay: 5000,
        type: 'info',
      })
    )
  } else {
    let text = 'Ошибка'
    let errorsStr = ''

    if (data.errors && Object.keys(data.errors).length > 0) {
      Object.keys(data.errors).forEach((e: any) => {
        if (Array.isArray(data.errors[e])) {
          data.errors[e].forEach((str: string) => {
            errorsStr += `; ${str}`
          })
        }
      })
    }

    yield put(
      showAsyncToast({
        text: text.concat(': ', errorsStr.slice(2)),
        delay: 60000,
        type: 'error',
      })
    )
  }

  yield put(setIsLoadingReviewItems(false))
}

export function* watchAsyncLoadReviewItems() {
  yield takeEvery(ASYNC_LOAD_REVIEW_ITEMS, asyncLoadReviewItemsWorker)
}
