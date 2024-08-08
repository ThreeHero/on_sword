import { makeAutoObservable } from 'mobx'
import Api from './api'
import { debounce } from 'lodash-es'

class Store {
  constructor() {
    makeAutoObservable(this)
    this.toggleWriterValue()
  }

  /**
   * 打字机文字
   */
  writerValue = ''

  // 切换打字机文字方法
  toggleWriterValue = debounce(async () => {
    const value = await Api.getTypingMachine()
    this.writerValue = value
  }, 300)
}

export default Store
