import React from 'react'
import styles from './ItemWrapper.module.scss'

interface Props {
  cityName: string
  onRemove: any
  children: JSX.Element | JSX.Element[]
}

export const ItemWrapper: React.FC<Props> = ({ onRemove, children, cityName }) => (
  <div className={styles['item-wrapper']}>
    <div>{children}</div>
    <button className={styles['item-wrapper__remove-btn']} onClick={() => onRemove(cityName)}>
      <i className="fas fa-times"></i>
    </button>
  </div>
)
