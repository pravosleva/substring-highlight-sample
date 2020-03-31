import React from 'react'
import { getEscapedRegExpChars } from '../../utils/getEscapedRegExpChars'
import { upperCaseFirstChar } from '../../utils/upperCaseFirstChar'

// BAD EXAMPLE

export const HighlightedTextV1: React.FC<{
  inputValue: string
  comparedValue: string
}> = (props) => {
  const { inputValue, comparedValue } = props
  const escapedInputValue: string = getEscapedRegExpChars(inputValue)
  const matchExp: RegExp = new RegExp(`${escapedInputValue}`, 'i')

  return (
    <span>
      {!!comparedValue.match(matchExp) ? (
        <span>
          {comparedValue.match(matchExp).index > 0 ? (
            <span>
              <span>{comparedValue.slice(0, comparedValue.match(matchExp).index)}</span>
              <strong>
                {comparedValue.match(matchExp).index === 1
                  ? inputValue
                  : comparedValue[comparedValue.match(matchExp).index - 1] === ' '
                  ? upperCaseFirstChar(inputValue)
                  : inputValue.toLowerCase()}
              </strong>
            </span>
          ) : (
            <strong>
              {inputValue.charAt(0).toUpperCase()}
              {inputValue.slice(1).toLowerCase()}
            </strong>
          )}
          <span>{comparedValue.slice(comparedValue.match(matchExp).index + inputValue.length)}</span>
        </span>
      ) : null}
      {!comparedValue.match(matchExp) && <>{comparedValue}</>}
    </span>
  )
}
