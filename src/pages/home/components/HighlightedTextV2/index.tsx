import React, { createContext, useMemo, useContext, ProviderProps } from 'react'
import { getEscapedRegExpChars } from 'src/utils/getEscapedRegExpChars'

// GOOD EXAMPLE

export type HighlightedTextV2Props = {
  children: string
}

const HighlightRegEx = createContext<RegExp | null>(null)

const regexFactory = (value: string) => {
  if (!value) return null
  return new RegExp(getEscapedRegExpChars(value), 'ig')
}

export const HighlightedTextV2Provider = ({ value, children }: ProviderProps<string>) => {
  const regex = useMemo(() => regexFactory(value), [value])

  return <HighlightRegEx.Provider value={regex}>{children}</HighlightRegEx.Provider>
}

export const HighlightedTextV2 = ({ children }: HighlightedTextV2Props) => {
  const regex = useContext(HighlightRegEx)
  if (regex === null) return <span>{children}</span>

  const matchIter = children.matchAll(regex)
  let matched = matchIter.next()

  if (matched.done) return <span>{children}</span>

  const matches: Array<JSX.Element> = []
  let { value } = matched

  if (value.index !== 0) matches.push(<span key={0}>{children.slice(0, value.index)}</span>)
  matches.push(<strong key={value.index}>{value[0]}</strong>)

  let ptr = (value.index as number) + value[0].length

  while ((matched = matchIter.next())) {
    if (matched.done) break
    value = matched.value
    matches.push(<span key={ptr}>{children.slice(ptr, value.index)}</span>)
    matches.push(<strong key={value.index}>{value[0]}</strong>)
    ptr = (value.index as number) + value[0].length
  }

  if (ptr < children.length) matches.push(<span key={ptr}>{children.slice(ptr)}</span>)

  return <>{matches}</>
}
