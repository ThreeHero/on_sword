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
  submitComment = async () => {
    if (!globalStore.currentUser?.id) return message.error('请先登录')
    await Api.addComment({
      articleId: this.id,
      content: this.commentValue,
      type: 'ARTICLE'
    })
    this.setCommentValue('')
    this.getRootCommentList()
  }

  commentPage = 1
  commentPageSize = 10

  /**
   * 根评论列表
   */
  rootCommentList = []
  rootCommentTotal = 0
  getRootCommentList = async () => {
    const res = await Api.getCommentList({
      articleId: this.id,
      type: 'ARTICLE',
      page: this.commentPage,
      pageSize: this.commentPageSize
    })
    this.rootCommentTotal = res.total
    this.rootCommentList = res.records
  }

  replyId = null
  replyVisible = false
  replyValue = ''
  setReplyValue = (value: string) => {
    this.replyValue = value
  }
  reply = comment => {
    if (!globalStore.currentUser?.id) return message.error('请先登录')
    this.replyId = comment.id
    this.replyVisible = true
  }
  replyComment = async () => {
    if (!globalStore.currentUser?.id) return message.error('请先登录')
    await Api.addComment({
      articleId: this.id,
      content: this.replyValue,
      type: 'ARTICLE',
      parentId: this.replyId
    })
    this.setReplyValue('')
    this.replyVisible = false
    message.success('回复成功')
    this.getRootCommentList()
  }
}

export default Store
