import { HttpRequestError } from '../errors/HttpRequestError'
import { groupLog } from '../groupLog'

function pause(delay = 100) {
  return new Promise((resolve) => setTimeout(resolve, delay))
}

async function* retrier({ attempts = Infinity, delay = 100 }) {
  for (let i = 0; i < attempts; i++) {
    yield i
    await pause(delay)
  }
}

// NOTE: Для заменяемости нативного клиента под капотом (fetch, axios, etc.)
const tryHttp = async ({
  index,
  url,
  method,
  body,
  bodyType,
  isDebugEnabled,
}: {
  index: number
  url: string
  method: 'GET' | 'POST'
  body: {
    [key: string]: any
  }
  bodyType: 'formdata' | 'json'
  isDebugEnabled: boolean
}): Promise<any> => {
  if (isDebugEnabled) console.log(`-> ${index} ${url}`)
  // if (index < 3) return Promise.reject({ ok: false, message: 'Fck u' })
  // return Promise.resolve({ ok: true })
  let bodyNormalized: any
  switch (true) {
    case bodyType === 'formdata':
      bodyNormalized = new FormData()

      for (const key in body) {
        switch (true) {
          // arrays
          // case 'as-array':
          // params[e].map(e => body.append(`${e}[]`, params[e]))
          // break
          // strings & others
          default:
            bodyNormalized.append(key, body[key])
            break
        }
      }
      break
    default:
      bodyNormalized = JSON.stringify(body)
      break
  }
  const res = await fetch(url, {
    method,
    body: bodyNormalized,
  })
    .then((res) => {
      if (res.ok) {
        return res.json()
      } else {
        if (isDebugEnabled)
          groupLog({
            header: `- http client [${method}] err log`,
            logType: 'error',
            argsArr: ['Неожиданный ответ от сервера', res],
          })
        throw new HttpRequestError(res.status, 'Неожиданный ответ от сервера')
      }
    })
    .then((json) => {
      if (json.success === 1) return json
      else throw new Error(json)
    })
    .catch((err) => ({
      success: 0,
      message: err?.message || 'No err.message',
    }))

  return res
}

class HttpClient {
  private yourHttpClient: ({
    url,
    method,
    body,
    bodyType,
    onEarchIterator,
    validator,
    cb,
    isDebugEnabled,
  }: {
    url: string
    method: 'GET' | 'POST'
    body: { [key: string]: any }
    bodyType: 'formdata' | 'json'
    onEarchIterator: (a: { res: any; index: number }) => void
    validator: any
    cb: {
      onSuccess: (res: any) => void
      onFuckup: (res: any) => void
    }
    isDebugEnabled: boolean
  }) => Promise<void>
  private baseURL: string
  // TODO: Abort Controllers...
  // TODO: Singletone
  // TODO: Custom { attempts, delay } settings for each method

  constructor({ baseApiUrl }: { baseApiUrl: string }) {
    this.baseURL = baseApiUrl
    // NOTE: axios.create? https://axios-http.com/docs/instance
    this.yourHttpClient = async ({ url, method, body, bodyType, onEarchIterator, validator, cb, isDebugEnabled }) => {
      for await (const i of retrier({ attempts: 10, delay: 500 })) {
        const result = await tryHttp({
          index: i,
          url: `${this.baseURL}${url}`,
          method,
          body,
          bodyType,
          isDebugEnabled,
        })
          .then((res) => res)
          .catch((err) => err)
        onEarchIterator({ res: result, index: i })
        if (validator.result(result)) {
          cb.onSuccess(result)
          break
        } else cb.onFuckup(result)
      }
    }
  }

  getRevewList<TRes>({
    cb,
    body,
    bodyType,
    isDebugEnabled,
  }: {
    cb: {
      onSuccess: (res: TRes) => void
      onFuckup: (res: any) => void
    }
    body: {
      [key: string]: any
    }
    bodyType: 'formdata' | 'json'
    isDebugEnabled: boolean
  }) {
    if (isDebugEnabled)
      groupLog({
        header: '- this is your event before request',
        argsArr: [body],
      })
    this.yourHttpClient({
      url: '/common/default/review-list/',
      method: 'POST',
      body,
      bodyType,
      isDebugEnabled,
      onEarchIterator: ({ res, index }) => {
        // NOTE: We have event on each iterate
        if (isDebugEnabled)
          groupLog({
            header: `- this is your event after request [attempt ${index}]`,
            argsArr: [res],
          })
      },
      validator: {
        // NOTE: We have access to each response
        result: (res: any) => res.success === 1,
      },
      cb,
    })
  }
}

export const uremontHttpClient = new HttpClient({ baseApiUrl: 'https://api-frontend.uservice.io' })
