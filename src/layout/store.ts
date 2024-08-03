import {
  clearToken,
  clearUserinfo,
  getCache,
  getToken,
  getUserinfo,
  setCache,
  options
} from '@/utils'
import { message } from 'antd'
import { makeAutoObservable } from 'mobx'
import moment from 'moment'
import Api from './api'

interface IUserInfo {
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

type Enum = { label: string; value: number | string; color?: string }

interface IDict {
  [key: string]: Enum[]
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
  currentUser: IUserInfo | {} = {}

  /**
   * 字典
   */
  dict: IDict = {}

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
    this.dict = { ...res, ...options }
  }

  /**
   * 根据字典值查询
   * @param {object} param
   * @param {string} param.by 字典字段
   * @param {string | number} param.value 查询的值
   * @param {string} param.dict 字典名称
   * @param {string} param.findField 查询出的字段
   * @returns
   */
  getDictValue = ({ by, value, dict, findField }: { by: string; value: string | number; dict: string; findField: string }) => {
    const item = this.dict[dict]
    return item?.find(item => item[by] === value)?.[findField]
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
