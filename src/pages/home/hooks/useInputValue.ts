import { useState } from 'react'

const upperCaseFirstChar = (str: string): string => {
  if (!str) return str

  return String(str[0].toUpperCase() + str.slice(1))
}
export const useInputValue = (defaultValue = '') => {
  const [value, setValue] = useState(defaultValue)

  return {
    bind: {
      value,
      onChange: (e: any): void => {
        setValue(e.target.value)
      },
    },
    clear: () => {
      setValue('')
    },
    getNormalizedValue: () => {
      return upperCaseFirstChar(value.trim())
    },
  }
}
