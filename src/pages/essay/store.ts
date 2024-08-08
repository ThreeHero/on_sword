import { makeAutoObservable } from 'mobx'
import Api from './api'
import { debounce } from 'lodash-es'
import { message } from 'antd'
import globalStore from '@/layout/store'

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

  essayValue = ''
  setEssayValue = (value: string) => {
    console.log(value)
    this.essayValue = value
  }

  submitEssay = async () => {
    await Api.addEssay({
      content: this.essayValue
    })
    this.essayValue = ''
    message.success('发布成功')
    this.essayPage = 1
    this.getEssayList()
  }

  essayList = []
  essayPage = 1
  essayPageSize = 10
  essayTotal = 0

  getEssayList = async () => {
    const res = await Api.getEssayList({
      page: this.essayPage,
      pageSize: this.essayPageSize
    })
    this.essayList = res.records.map(item => ({ ...item, essay: true }))
    this.essayTotal = res.total
  }
}

export default Store
