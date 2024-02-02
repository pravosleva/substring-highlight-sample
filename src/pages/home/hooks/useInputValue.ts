import { useState } from 'react'
import { getEscapedRegExpChars } from '../../../utils/getEscapedRegExpChars'

const upperCaseFirstChar = (str: string): string => {
  if (!str) return str

  return String(str[0].toUpperCase() + str.slice(1))
}
export const useInputValue = (defaultValue = '') => {
  const [value, setValue] = useState(defaultValue)
  const [valueRegExp, setValueRegExp] = useState(new RegExp(''))

  return {
    bind: {
      value,
      onChange: (e: any): void => {
        setValue(e.target.value)
        setValueRegExp(new RegExp(`^(.*?)(${getEscapedRegExpChars(e.target.value)})(.*)$`, 'i'))
      },
    },
    valueRegExp,
    clear: () => {
      setValue('')
      setValueRegExp(new RegExp(''))
    },
    getNormalizedValue: () => {
      return upperCaseFirstChar(value.trim())
    },
  }
}
