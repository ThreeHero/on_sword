import { AxiosInstance } from 'axios'
import NProgress from 'nprogress'

export function requestIntercept(http: AxiosInstance & {globalConfig: any, getConfig: () => any}) {
  http.interceptors.request.use(
    config => {
      NProgress.start()
      const { baseUrl, headers, ...httpConfig } = http.getConfig()
      config.baseURL = typeof baseUrl === 'function' ? baseUrl() : baseUrl
      config.headers = typeof headers === 'function' ? headers() : headers
      config = { ...httpConfig, ...config }
      return config
    },
    error => {
      return Promise.reject(error)
    }
  )
}
