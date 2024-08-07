import { makeAutoObservable } from 'mobx'
import Api from './api'
import { message } from 'antd'
import globalStore from '@/layout/store'

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
  submitComment = async (parentId?) => {
    if (!globalStore.currentUser?.id) return message.error('请先登录')
    await Api.addComment({
      articleId: this.id,
      content: this.commentValue,
      type: 'ARTICLE',
      parentId
    })
    this.setCommentValue('')
    this.getRootCommentList()
  }

  /**
   * 根评论列表
   */
  rootCommentList = []
  getRootCommentList = async () => {
    const res = await Api.getCommentList({
      articleId: this.id,
      type: 'ARTICLE'
    })
    this.rootCommentList = res.records
  }
}

export default Store
