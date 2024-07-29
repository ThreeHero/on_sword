import axios, { AxiosInstance } from 'axios'
import { requestIntercept } from '@/utils/service/request'
import { responseIntercept } from '@/utils/service/response'

// 创建请求实例
function createInstance(config?: any) {
  const instance: any  =  axios.create()
  instance.defaults.timeout = 5000
  instance.defaults.baseURL = 'http://localhost:30000'
  instance.globalConfig = config
  instance.getConfig = () => config
  // 添加拦截器
  requestIntercept(instance)
  responseIntercept(instance)
  return instance
}

/**
 * 获取实例
 */
function getInstance(http: any) {
  if (http?.config) {
    http.instance = createInstance(http.config)
  }

  if (http.instance) {
    return http.instance
  }


  return http.instance
}

export default getInstance
