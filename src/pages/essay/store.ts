import { makeAutoObservable } from 'mobx'
import Api from './api'
import { debounce } from 'lodash-es'
import { message, Modal } from 'antd'
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

  removeEssay = (id: number) => {
    Modal.confirm({
      title: '确定删除吗？',
      onOk: async () => {
        await Api.removeEssay(id)
        this.getEssayList()
        message.success('删除成功')
      }
    })
  }

  currentShowEssayId = null
  commentModal = false

  showComment = (id: number) => {
    this.currentShowEssayId = id
    this.commentModal = true
  }

  commentPage = 1
  commentPageSize = 10

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
      articleId: this.currentShowEssayId,
      content: this.commentValue,
      type: 'ESSAY'
    })
    this.setCommentValue('')
    this.getRootCommentList()
  }

  /**
   * 根评论列表
   */
  rootCommentList = []
  rootCommentTotal = 0
  getRootCommentList = async () => {
    const res = await Api.getCommentList({
      articleId: this.currentShowEssayId,
      type: 'ESSAY',
      page: this.commentPage,
      pageSize: this.commentPageSize
    })
    this.rootCommentTotal = res.total
    this.rootCommentList = res.records
  }
}

export default Store
