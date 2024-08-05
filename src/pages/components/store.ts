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
  loadingArticle = false
  articleTotal = 0

  /**
   * 是否查看我可见的
   */
  isMine = true

  /**
   * 获取文章列表
   */
  getArticleList = async (isMix = false) => {
    try {
      this.loadingArticle = true
      if (!isMix) {
        this.articleList = []
      }
      const res = await Api.getArticleList({
        page: this.currentPage,
        pageSize: 1,
        isMine: this.isMine,
        classificationId: this.activeClass === 'all' ? undefined : this.activeClass
      })
      if (isMix) {
        this.articleList = [...this.articleList, ...res.records]
      } else {
        this.articleList = res.records
      }
      this.articleTotal = res.total
    } catch {
    } finally {
      this.loadingArticle = false
    }
  }

  /**
   * 分类列表
   */
  classList = []
  activeClass: number | string = 'all'

  /**
   * 获取分类列表
   */
  getClassList = async () => {
    const res = await Api.getClassList({ pageSize: 8 })
    this.classList = res.records
  }
}

export default Store
