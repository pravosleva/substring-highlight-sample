export const escapeRegExpChars = string =>
  string
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
    .replace(/\}/g, '\\}');
