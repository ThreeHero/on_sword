import { makeAutoObservable } from 'mobx'
import Api from './api'
import { message } from 'antd'

interface IState {
  type?: string
  articleId?: number
}

class Store {
  props: IState = {}
  constructor(state: IState) {
    makeAutoObservable(this)
    this.props = state

    this.getList()
  }

  dataSource = []
  total = 0
  loading = false

  getList = async () => {
    this.loading = true
    const res = await Api.getList(this.props)
    this.dataSource = res.records.map(item => ({
      ...item,
      children: item.childCommentCount > 0 ? [] : undefined,
      subPage: 1
    }))
    this.total = res.total
    this.loading = false
  }

  page = 1
  pageSize = 10

  subCommentMap = {}

  changePage = (page: number, pageSize: number) => {
    this.page = page
    this.pageSize = pageSize
    this.getList()
  }

  showMore = async (rootId: number, page: number = 1) => {
    this.loading = true
    const res = await Api.getList({
      ...this.props,
      rootId,
      page,
      pageSize: 5
    })
    const list = res.records

    const current = this.dataSource.find(item => item.id === rootId)
    // current.children = list
    current.subPage = page
    this.subCommentMap[current.id + '-list'] = list
    this.subCommentMap[current.id + '-total'] = res.total
    this.subCommentMap[current.id + '-parent'] = current
    this.loading = false
  }

  remove = async id => {
    await Api.remove(id)
    this.getList()
    this.expandedRowKeys = []
    message.success('删除成功！')
  }

  // 展开行
  expandedRowKeys = []
  onExpand = (expanded, record) => {
    if (expanded) {
      this.expandedRowKeys = [record.id]
      this.showMore(record.id, record.subPage)
    } else {
      this.expandedRowKeys = []
    }
  }
}

export default Store
