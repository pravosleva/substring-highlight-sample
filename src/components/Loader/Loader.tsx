import React from 'react'
import styles from './Loader.module.scss'

export const Loader: React.FC<any> = ({ text }: { text: string }) => (
  <div className={styles.wrapper}>
    <div>{text}</div>
  </div>
)
