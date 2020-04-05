import { SET_REVIEW_ITEMS, ADD_REVIEW_ITEMS, SET_IS_LOADING_REVIEW_ITEMS } from '../../actions'

const inititalState = {
  reviews: {
    isLoading: false,

    items: [],
    totalCount: 0,
    pagesCount: 0,
    pageSize: 0,
  },
}

export const uremont = (state = inititalState, action: any) => {
  switch (action.type) {
    case ADD_REVIEW_ITEMS:
      return {
        ...state,
        reviews: {
          items: [...state.reviews.items, ...action.payload.reviews],
          isLoading: false,
          totalCount: action.payload.totalCount,
          pagesCount: action.payload.pagesCount,
          pageSize: action.payload.pageSize,
        },
      }
    case SET_IS_LOADING_REVIEW_ITEMS:
      return {
        ...state,
        reviews: {
          ...state.reviews,
          isLoading: action.payload,
        },
      }
    case SET_REVIEW_ITEMS:
      return {
        ...state,
        reviews: {
          ...inititalState.reviews,
        },
      }
    default:
      return state
  }
}
