import { ADD_CITY, REMOVE_CITY } from '../../actions'

const inititalState = [
  'Москва',
  'Мо',
  'Можайск',
  'Санкт-Петербург',
  'Уфа',
  'Казань',
  'Тверь',
  'Владимир',
  'Нижний Новгород',
]

export const citylist = (state = inititalState, action) => {
  switch (action.type) {
    case ADD_CITY:
      console.log(action.payload)
      return [...state, action.payload]
    case REMOVE_CITY:
      return state.filter(e => action.payload !== e)
    default:
      return state
  }
}
