import { baseURL } from '@/utils/service'
export * from './base'
export { default as http, baseURL } from './service'
export * from './storage'

// @ts-ignore
String.prototype.resource = function () {
  return baseURL + this
}
