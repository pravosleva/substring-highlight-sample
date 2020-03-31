export const getEscapedRegExpChars = (string: string): string => {
  return string
    .replace(/\\/g, '\\\\')
    .replace(/\(/g, '\\(')
    .replace(/\)/g, '\\)')
    .replace(/\[/g, '\\[')
    .replace(/\]/g, '\\]')
    .replace(/\*/g, '\\*')
    .replace(/\+/g, '\\+')
    .replace(/\./g, '\\.')
    .replace(/\$/g, '\\$')
    .replace(/\^/g, '\\^')
    .replace(/\?/g, '\\?')
    .replace(/\{/g, '\\{')
    .replace(/\}/g, '\\}')
}
