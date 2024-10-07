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
      subPage: 0
    }))
    this.total = res.total
    this.loading = false
  }

  page = 1
  pageSize = 10

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
    if (page > res.pages || page < 0) {
      this.loading = false
      return message.warning('没有更多了！')
    }

    const current = this.dataSource.find(item => item.id === rootId)
    if (page <= 0) {
      current.children = []
      current.subPage = 0
      this.loading = false
      return
    }
    current.children = list
    current.subPage = page

    this.loading = false
  }

  remove = async id => {
    await Api.remove(id)
    this.getList()
    message.success('删除成功！')
  }
}

export default Store
