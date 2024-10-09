import { message } from 'antd'
import { AxiosError } from 'axios'
import { getToken } from '@/utils'
// export const baseURL = 'http://localhost:30000'
export const baseURL = 'http://192.168.10.7:30000'

const handleHttpError = res => {
  if (!res) {
    return
  }
  const { code, message: msg } = res
  message.destroy()
  if ([403, 404].includes(code)) {
    message.error(msg, 3)
  } else {
    console.error(msg)
  }
}

export default {
  baseUrl: () => {
    return baseURL
  },
  headers() {
    const token = getToken()
    return {
      Authorization: token ? `Bearer ${token}` : ''
    }
  },
  transformResult(res: any) {
    const { code, message: msg, data, success } = res.data
    const config = res.config
    if (success) {
      return data
    }
    handleHttpError(res.data)
    return Promise.reject(msg)
  },
  error(e: AxiosError) {
    const { data } = e.response || {}
    handleHttpError(data)
  }
}
