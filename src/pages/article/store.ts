import { makeAutoObservable } from 'mobx'
import Api from './api'

class Store {
  id
  constructor(id) {
    makeAutoObservable(this)
    this.id = id

    this.init()
  }

  init = () => {
    this.getArticle()
  }

  articleInfo: any = {}
  getArticle = async () => {
    const res = await Api.getArticleInfo(this.id)
    this.articleInfo = res
  }
}

export default Store
