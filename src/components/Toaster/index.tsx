import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { ToastType, ToastModel, forceHideToast } from '../../actions'
import cn from 'classnames'

type FontAwesomeClassNamesAsMsgType = 'fa-ban' | 'fa-exclamation-triangle' | 'fa-info-circle'

const getFontAwesomeClassNameByType = (type: ToastType): FontAwesomeClassNamesAsMsgType => {
  switch (type) {
    case 'error':
      return 'fa-ban'
    case 'warning':
      return 'fa-exclamation-triangle'
    case 'info':
      return 'fa-info-circle'
    default:
      return 'fa-info-circle'
  }
}
export const Toaster: React.FC = () => {
  const items: ToastModel[] = useSelector((state: any) => state.toaster.items)
  const dispatch = useDispatch()
  const handleRemove = (id: number): void => {
    dispatch(forceHideToast(id))
  }

  return (
    <div className="toast-container">
      {items.map((e: ToastModel) => (
        <div key={e.id} className={`toast-item toast-item--${e.status}`} onClick={handleRemove.bind(null, e.id)}>
          <div className="toast-item--wrapper">
            <div>
              <i className={cn('fas', getFontAwesomeClassNameByType(e.type))}></i>
            </div>
            <div>{e.text}</div>
          </div>
        </div>
      ))}
    </div>
  )
}
