import getInstance from '@/utils/service/instance'
import httpConfig from './config'
export const baseURL = 'https://localhost:30000'

// 创建请求
const http: any = (...arg) => getInstance(http)(...arg)

http.setConfig = config => {
  http.config = config
  getInstance(http)
}

http.getConfig = () => {
  return getInstance(http).getConfig()
}

http.get = (...arg) => getInstance(http).get(...arg)
http.post = (...arg) => getInstance(http).post(...arg)
http.delete = (...arg) => getInstance(http).delete(...arg)
http.put = (...arg) => getInstance(http).put(...arg)

http.setConfig(httpConfig)

export default http
