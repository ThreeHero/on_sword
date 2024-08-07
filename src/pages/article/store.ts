import { makeAutoObservable } from 'mobx'
import Api from './api'
import { message } from 'antd'

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
  isLike = false
  isCollect = false

  /**
   * 移动端目录抽屉
   */
  mobileDrawerVisible = false

  getArticle = async () => {
    const res = await Api.getArticleInfo(this.id)
    this.articleInfo = res
    this.isLike = res.isLike
    this.isCollect = res.isCollect
  }

  like = async () => {
    const msg = await Api.like({ id: this.id })
    this.isLike = !this.isLike
    message.success(msg)
  }

  collect = async () => {
    const msg = await Api.collect({ id: this.id })
    this.isCollect = !this.isCollect
    message.success(msg)
  }

  /**
   * 评论内容
   */
  commentValue = ''
  setCommentValue = (value: string) => {
    this.commentValue = value
  }
  submitComment = () => {}
}

export default Store
