const getHoursMinutesSecondsByMS = (ms: number) => {
  const dt = new Date(ms)
  const hrs = dt.getHours() < 10 ? `0${dt.getHours()}` : dt.getHours()
  const mins = dt.getMinutes() < 10 ? `0${dt.getMinutes()}` : dt.getMinutes()
  const secds = dt.getSeconds() < 10 ? `0${dt.getSeconds()}` : dt.getSeconds()
  const msds =
    dt.getMilliseconds() < 10
      ? `00${dt.getMilliseconds()}`
      : dt.getMilliseconds() >= 10 && dt.getMilliseconds() < 100
        ? `0${dt.getMilliseconds()}`
        : dt.getMilliseconds() >= 100 && dt.getMilliseconds() < 1000
          ? `${dt.getMilliseconds()}`
          : dt.getMilliseconds()

  return `${hrs}:${mins}:${secds}.${msds}`
}

const makeCounter = () => {
  let currentCounter = 0

  return (step = 1) => {
    currentCounter += step
    return currentCounter
  }
}
const logCounter = makeCounter()
const todoCounter = makeCounter()
export const groupLog = ({
  header,
  logType,
  argsArr,
  css = 'color: #40bcff;',
}: {
  header: string
  logType?: 'todo' | 'error' | 'warn' | 'colorful' | 'danger' | 'info'
  argsArr: any
  css?: string
}): void => {
  let logID: number
  const timeInMs = new Date().getTime()
  let title: string

  switch (logType) {
    case 'todo':
      logID = todoCounter()
      title = `TODO #${logID} (${getHoursMinutesSecondsByMS(timeInMs)}) ${header}`
      break
    default:
      logID = logCounter()
      title = `LOG #${logID} (${getHoursMinutesSecondsByMS(timeInMs)}) ${header}`
      break
  }

  console.group(title)
  switch (logType) {
    case 'error':
      argsArr.forEach(console.error)
      break
    case 'warn':
      argsArr.forEach(console.error)
      break
    case 'colorful':
      argsArr.forEach((e: any) => (typeof e !== 'object' ? console.log(`%c ${e}`, css) : console.log(e)))
      break
    // example: groupLog('cDM', 'colorful', [obj, 'NewApplication/components/GMapRadius/hoc', 'lifecycle'], 'background-color: #40bcff; color: black;');
    case 'todo':
      argsArr.forEach((e: any, i: number) =>
        typeof e !== 'object'
          ? i === 0
            ? console.log(`%c ${e}`, 'background-color: yellow; color: black;')
            : console.log(e)
          : console.log(e)
      )
      break
    case 'danger':
      argsArr.forEach((e: any, i: number, a: any) =>
        typeof e !== 'object' && i !== a.length - 1
          ? console.log(`%c ${e}`, 'background-color: #EC6150; color: black;')
          : console.log(e)
      )
      break
    case 'info':
      argsArr.forEach((e: any, i: number, a: any) =>
        typeof e !== 'object' && i !== a.length - 1
          ? console.log(`%c ${e}`, 'background-color: #40bcff; color: black;')
          : console.log(e)
      )
      break
    default:
      argsArr.forEach((e: any) => console.log(e))
      break
  }
  console.groupEnd()
}
