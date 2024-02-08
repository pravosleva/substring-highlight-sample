import React, { ChangeEventHandler } from 'react'
import styles from './CheckBox.module.scss'

export type CheckBoxProps = {
  checked: boolean
  onChange: ChangeEventHandler<HTMLInputElement>
}

export const CheckBox = ({ checked = false, onChange }: CheckBoxProps) => (
  <div className={styles['checkbox-round']}>
    <input type="checkbox" checked={checked} onChange={onChange} />
    <label />
  </div>
)
