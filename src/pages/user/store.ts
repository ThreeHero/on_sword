import { makeAutoObservable } from 'mobx'
import Api from './api'
import { message } from 'antd'

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

  otherUserInfo: any = {}
  isFollow = false

  getOtherUserInfo = async id => {
    const res = await Api.getUserInfo(id)
    this.otherUserInfo = res
    this.isFollow = res.isFollow
  }

  // 关注
  follow = async id => {
    if (!this.isFollow) {
      // 关注
      await Api.follow(id)
      this.isFollow = true
      message.success('关注成功')
    } else {
      await Api.unFollow(id)
      this.isFollow = false
      message.success('取消关注')
    }
  }
}

export default Store
