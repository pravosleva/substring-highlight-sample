export type ToastType = 'default' | 'error' | 'warning' | 'info'

export interface ToastModel {
  id: number
  text: string
  delay: number
  type: ToastType
  status: string
}
export interface ShowAsyncArgs {
  text: string
  delay: number
  type: ToastType
}

export const SHOW_TOAST_START = 'SHOW_TOAST_START'
export const SHOW_TOAST_FINISH = 'SHOW_TOAST_FINISH'
export const HIDE_TOAST_START = 'HIDE_TOAST_START'
export const HIDE_TOAST_FINISH = 'HIDE_TOAST_FINISH'
export const REMOVE_TOAST = 'REMOVE_TOAST'
export const FORCE_HIDE_TOAST = 'FORCE_HIDE_TOAST'
export const SHOW_TOAST_ASYNC = 'SHOW_TOAST_ASYNC'

export const showAsyncToast = (props: ShowAsyncArgs) => {
  const { text, delay, type } = props

  return { type: SHOW_TOAST_ASYNC, payload: { text, delay, type } }
}

export const forceHideToast = (id: number) => {
  return { type: FORCE_HIDE_TOAST, payload: id }
}
