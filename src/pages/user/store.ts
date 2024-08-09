import { makeAutoObservable } from 'mobx'
import Api from './api'

class Store {
  constructor() {
    makeAutoObservable(this)
  }

  page = 1
  pageSize = 5
  total = 0
  articleList = []

  getArticleList = async ({ type, publisherId }) => {
    const params: { [props: string]: any } = {
      page: this.page,
      pageSize: this.pageSize
    }
    switch (type) {
      case 'user':
        params.publisherId = publisherId
        params.isMine = false
        params.isShowPrivate = true
        params.status = undefined
        break
      case 'otherUser':
        params.publisherId = publisherId
        params.isMine = false
        params.status = 1
    }
    const res = await Api.getArticleList(params)
    this.articleList = res.records
    this.total = res.total
  }

  likeArticleList = async () => {
    const res = await Api.likeList({
      page: this.page,
      pageSize: this.pageSize
    })
    this.articleList = res.records
    this.total = res.total
  }
  collectArticleList = async () => {
    const res = await Api.collectList({
      page: this.page,
      pageSize: this.pageSize
    })
    this.articleList = res.records
    this.total = res.total
  }
}

export default Store
