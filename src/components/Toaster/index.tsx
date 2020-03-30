import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { forceHideToast } from '../../actions'
import cn from 'classnames'
import { ToastType, ToastModel } from '../../actions'


const getClassNameByType = (type: ToastType) => {
  switch(type) {
    case 'error': return 'fa-ban'
    case 'warning': return 'fa-exclamation-triangle'
    case 'info': return 'fa-info-circle'
    default: return 'fa-info-circle'
  }
}
export const Toast: React.FC = () => {
  const items = useSelector(state => state.toaster.items)
  const dispatch = useDispatch();
  const handleRemove = (id: number): void => {
    dispatch(forceHideToast(id))
  }

  return (
    <div className='toast-container'>{items.map((e: ToastModel) => (
      <div key={e.id} className={`toast-item toast-item--${e.status}`} onClick={handleRemove.bind(null, e.id)}>
        <div className='toast-item--wrapper'>
          <div><i className={cn('fas', getClassNameByType(e.type))}></i></div>
          <div>{e.text}</div>
        </div>
      </div>
    ))}</div>
  )
}
