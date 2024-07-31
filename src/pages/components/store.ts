import { makeAutoObservable } from 'mobx'
import Api from './api'
import { debounce } from 'lodash-es'

class Store {
  constructor() {
    makeAutoObservable(this)
    this.init()
  }

  init = () => {
    this.toggleWriterValue()
    this.getArticleList()
  }

  currentPage = 1

  /**
   * 打字机文字
   */
  writerValue = ''

  // 切换打字机文字方法
  toggleWriterValue = debounce(async () => {
    const value = await Api.getTypingMachine()
    this.writerValue = value
  }, 300)

  /**
   * 文章列表
   */
  articleList = []

  /**
   * 获取文章列表
   */
  getArticleList = async () => {
    const res = await Api.getArticleList({ page: this.currentPage })
    this.articleList = res
  }
}

export default Store
