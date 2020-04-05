import React from 'react'
import { HighlighedTextModel } from './HighlightedTextModel'

// GOOD EXAMPLE

export const HighlightedTextV2: React.FC<HighlighedTextModel.Props> = ({ inputValueRegExp, comparedValue }) => {
  const match = comparedValue.match(inputValueRegExp)

  return (
    <div>
      {match && match.length > 0 ? (
        <span>
          {match[1]}
          <strong>{match[2]}</strong>
          {match[3]}
        </span>
      ) : (
        <span>{comparedValue}</span>
      )}
    </div>
  )
}
