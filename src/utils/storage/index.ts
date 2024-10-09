const TOKEN_KEY = 'APP_TOKEN_KEY'
const USERINFO = 'APP_USER_INFO'

// 设置缓存
export function setCache(key: string, value: any, isL = true) {
  if (typeof key !== 'string') return null
  if (value === null || value === undefined || Number.isNaN(value)) {
    return null
  }
  const Storage = isL ? localStorage : sessionStorage
  const v = JSON.stringify(value)
  Storage.setItem(key, v)
}

export function getCache(key: string | string[], isL = true) {
  const Storage = isL ? localStorage : sessionStorage

  if (typeof key === 'string') {
    // 获取值
    const value = Storage.getItem(key)
    if (value === null || value === undefined || Number.isNaN(value)) {
      return null
    }
    return JSON.parse(value)
  }
  // 2. key是数组
  if (Array.isArray(key)) {
    return key.map(k => getCache(k, isL))
  }
}

export function clearCache(key: string, isL = true) {
  const Storage = isL ? localStorage : sessionStorage
  Storage.removeItem(key)
}

export const getToken = () => {
  return getCache(TOKEN_KEY)
}

export const getUserinfo = () => {
  return getCache(USERINFO)
}

export const setToken = token => {
  setCache(TOKEN_KEY, token)
}

export const setUserinfo = userinfo => {
  setCache(USERINFO, userinfo)
}

export const clearToken = () => {
  clearCache(TOKEN_KEY)
}

export const clearUserinfo = () => {
  clearCache(USERINFO)
}
