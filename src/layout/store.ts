import { clearToken, clearUserinfo, getCache, getToken, getUserinfo, setCache } from '@/utils'
import { message } from 'antd'
import { makeAutoObservable } from 'mobx'
import moment from 'moment'
import Api from './api'

interface UserInfo {
  id: number
  account: string
  nickname: string
  email: string
  avatar?: string
  identity: number
  introduction?: string
  createdAt: string
  updatedAt: string
  status: number
}

/**
 * 判断时间是否在范围内
 * @returns
 */
const isWithinTimeRange = (startTime: string, endTime: string): boolean => {
  const currentMoment = moment(new Date(), 'HH:mm:ss')
  const startMoment = moment(startTime, 'HH:mm:ss')
  const endMoment = moment(endTime, 'HH:mm:ss')
  return currentMoment.isSameOrAfter(startMoment) && currentMoment.isSameOrBefore(endMoment)
}

class Store {
  /**
   * 是否夜间模式
   */
  isDark = false

  /**
   * 是否登录
   */
  isLogin = false

  /**
   * 移动端菜单栏抽屉开关
   */
  mobileMenu = false

  /**
   * 有权限的页面
   */
  permissionPage = [
    '/user' // 个人中心
  ]

  /**
   * 当前登录用户信息
   */
  currentUser: UserInfo | {} = {}

  /**
   * 字典
   */
  dict = []

  constructor() {
    makeAutoObservable(this)

    setTimeout(() => {
      if (getCache('isDark', false) != null) {
        this.toggleDark(getCache('isDark', false), false)
      } else {
        const isWith = isWithinTimeRange('09:00:00', '20:00:00')
        this.toggleDark(!isWith, false)
      }
      if (getUserinfo()) {
        this.currentUser = getUserinfo()
      }
    }, 0)
    this.isLogin = !!getToken()
    this.getDict()
  }

  /**
   * 获取字典
   */
  getDict = async () => {
    const res = await Api.getDict()
    this.dict = res
  }

  /**
   * 切换主题
   */
  toggleDark = (current?: boolean, isCache = true) => {
    this.isDark = current ?? !this.isDark
    const root = document.documentElement
    const get = (key: string) => getComputedStyle(root).getPropertyValue(key)
    const set = (key: string, getKey: string) => root.style.setProperty(key, get(getKey))
    if (this.isDark) {
      set('--current-bg', '--bg-color2')
      set('--current-color', '--text-color2')
      set('--current-border', '--border-color2')
    } else {
      set('--current-bg', '--bg-color')
      set('--current-color', '--text-color')
      set('--current-border', '--border-color')
    }

    isCache && setCache('isDark', this.isDark, false)
  }

  /**
   * 退出登录
   */
  logout = (callback?) => {
    this.isLogin = false
    clearToken()
    clearUserinfo()
    this.mobileMenu = false
    message.success('退出成功')
    callback?.()
  }
}

export default new Store()
