import { getCache, setCache } from '@/utils'
import { makeAutoObservable } from 'mobx'
import moment from 'moment'

/**
 * 判断时间是否在范围内
 * @returns
 */
const isWithinTimeRange = (startTime: string, endTime: string): boolean => {
  const currentMoment = moment('HH:mm:ss')
  const startMoment = moment(startTime, 'HH:mm:ss')
  const endMoment = moment(endTime, 'HH:mm:ss')
  return currentMoment.isSameOrAfter(startMoment) && currentMoment.isSameOrBefore(endMoment)
}

class Store {
  isDark = false

  constructor() {
    makeAutoObservable(this)
    setTimeout(() => {
      if (getCache('isDark', false) != null) {
        this.toggleDark(getCache('isDark', false))
      } else {
        const isWith = isWithinTimeRange('09:00:00', '20:00:00')
        this.toggleDark(!isWith)
      }
    }, 0)
  }

  /**
   * 切换主题
   */
  toggleDark = (current?: boolean) => {
    this.isDark = current ?? !this.isDark
    const root = document.documentElement
    const get = (key: string) => getComputedStyle(root).getPropertyValue(key)
    const set = (key: string, getKey: string) => root.style.setProperty(key, get(getKey))
    if (this.isDark) {
      set('--current-bg', '--bg-color2')
      set('--current-color', '--text-color2')
    } else {
      set('--current-bg', '--bg-color')
      set('--current-color', '--text-color')
    }

    setCache('isDark', this.isDark, false)
  }
}

export default new Store()
