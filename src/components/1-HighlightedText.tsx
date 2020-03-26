import React from 'react'


interface Props {
  inputValueRegExp: RegExp
  comparedValue: string
}

export const HighlightedText: React.FC<Props> = props => {
  const { inputValueRegExp, comparedValue } = props
  const match = comparedValue.match(inputValueRegExp)

  return match && match.length > 0 ? <span>{match[1]}<strong>{match[2]}</strong>{match[3]}</span> : <span>{comparedValue}</span>
}


// export const HighlightedText: React.FC = memo(App, areEqual)

/*
const searchValue = ‘оста’
const value = 'ост. Москва возле Останкино'

const match = value.match(new RegExp(`^(.*?)(${searchValue})(.*)$`, 'i'))

return match ? <span>{match[1]}<b>{match[2]}</b>{match[3]}</span> : value

так можно подсветить нужный участок без проблем
---
new RegExp(`^(.*?)(${searchValue})(.*)$` лучше заранее перед передачей в массив
остальное в компоненте

export namespace HighlightedTextModel {
  export interface Props {
    inputValueRegExp: RegExp
    comparedValue: string
  }
}
*/
