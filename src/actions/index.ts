export const ADD_CITY = 'ADD_CITY'
export const REMOVE_CITY = 'REMOVE_CITY'

export const addCity = (name: string) => {
  return { type: ADD_CITY, payload: name }
}
export const removeCity = (name: string) => {
  return { type: REMOVE_CITY, payload: name }
}
