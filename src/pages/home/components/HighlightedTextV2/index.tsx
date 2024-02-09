import React from 'react'
import { HighlighedTextModel } from './HighlightedTextModel'

// GOOD EXAMPLE

export const HighlightedTextV2Inner: React.FC<HighlighedTextModel.Props> = ({ inputValueRegExp, comparedValue }) => {
  if (inputValueRegExp.source === '(?:)') return <span>{comparedValue}</span>

  const matchIter = comparedValue.matchAll(inputValueRegExp)
  let matched = matchIter.next()

  if (matched.done) return <span>{comparedValue}</span>

  const matches: Array<JSX.Element> = []
  let { value } = matched

  if (value.index !== 0) matches.push(<span key={0}>{comparedValue.slice(0, value.index)}</span>)
  matches.push(<strong key={value.index}>{value[0]}</strong>)

  let ptr = (value.index as number) + value[0].length

  while ((matched = matchIter.next())) {
    if (matched.done) break
    value = matched.value
    matches.push(<span key={ptr}>{comparedValue.slice(ptr, value.index)}</span>)
    matches.push(<strong key={value.index}>{value[0]}</strong>)
    ptr = (value.index as number) + value[0].length
  }

  if (ptr < comparedValue.length) matches.push(<span key={ptr}>{comparedValue.slice(ptr)}</span>)

  return <>{matches}</>
}

export const HighlightedTextV2: React.FC<HighlighedTextModel.Props> = (props) => {
  return (
    <div>
      <HighlightedTextV2Inner {...props} />
    </div>
  )
}
