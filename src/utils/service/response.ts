import { AxiosInstance } from 'axios'
import NProgress from 'nprogress'

export function responseIntercept(http: AxiosInstance) {
  http.interceptors.response.use(
    response => interceptorResponse(http, response),
    err => interceptorError(http, err)
  )
}

function interceptorResponse(http, res) {
  NProgress.done()
  const { transformResult } = res.config || {}
  if (typeof transformResult === 'function') {
    return transformResult(res)
  }
  return res
}

function interceptorError(http, err) {
  NProgress.done()
  const { config } = err
  if (!config) {
    return Promise.reject(err)
  }
  const { error, key } = config
  if (typeof error === 'function') {
    error(err)
  }
  return Promise.reject(err)
}
