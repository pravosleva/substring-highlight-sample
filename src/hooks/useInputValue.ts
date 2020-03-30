import { useState } from 'react'

const upperCaseFirstChar = (str: string): string => {
  if (!str) return str

  return String(str[0].toUpperCase() + str.slice(1))
}
export const useInputValue = (defaultValue = '') => {
  const [value, setValue] = useState(defaultValue)
  const [valueRegExp, setValueRegExp] = useState(new RegExp(null))

  return {
    bind: {
      value,
      onChange: (e: any): void => {
        setValue(e.target.value)
        setValueRegExp(new RegExp(`^(.*?)(${e.target.value})(.*)$`, 'i'))
      },
    },
    valueRegExp,
    clear: () => {
      setValue('')
      setValueRegExp(new RegExp(null))
    },
    getNormalizedValue: () => {
      return upperCaseFirstChar(value.trim())
    },
  }
}
