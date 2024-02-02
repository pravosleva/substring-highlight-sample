import React from 'react'
import { getEscapedRegExpChars } from 'src/utils/getEscapedRegExpChars'
import { upperCaseFirstChar } from 'src/utils/upperCaseFirstChar'

// BAD EXAMPLE

const HighlightedTextV1Matched = ({
  regexMatch,
  comparedValue,
  inputValue,
}: {
  regexMatch: RegExpMatchArray
  comparedValue: string
  inputValue: string
}) => {
  const regexMatchIndex = regexMatch.index as number

  return (
    <span>
      {regexMatchIndex > 0 ? (
        <span>
          <span>{comparedValue.slice(0, regexMatchIndex)}</span>
          <strong>
            {regexMatchIndex === 1
              ? inputValue
              : comparedValue[regexMatchIndex - 1] === ' '
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
      <span>{comparedValue.slice(regexMatchIndex + inputValue.length)}</span>
    </span>
  )
}

export const HighlightedTextV1: React.FC<{
  inputValue: string
  comparedValue: string
}> = (props) => {
  const { inputValue, comparedValue } = props
  const escapedInputValue: string = getEscapedRegExpChars(inputValue)
  const matchExp: RegExp = new RegExp(`${escapedInputValue}`, 'i')
  const regexMatch = comparedValue.match(matchExp)

  return (
    <span>
      {regexMatch ? (
        <HighlightedTextV1Matched inputValue={inputValue} comparedValue={comparedValue} regexMatch={regexMatch} />
      ) : null}
      {!regexMatch && <>{comparedValue}</>}
    </span>
  )
}
