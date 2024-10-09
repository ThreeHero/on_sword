import { makeAutoObservable } from 'mobx'
import Api from './api'
import { message } from 'antd'

class Store {
  constructor() {
    makeAutoObservable(this)
    this.getList()
    // this.read()
  }

  page = 1
  pageSize = 10
  total = 0
  list = []

  getList = async () => {
    const res = await Api.getList({
      page: this.page,
      pageSize: this.pageSize
    })
    this.list = res.records
    this.total = res.total
  }

  changePage = (page: number) => {
    this.page = page
    this.getList()
  }

  read = async () => {
    await Api.showNoticeTime({})
  }

  remove = async (id: number) => {
    await Api.remove(id)
    this.getList()
    message.success('删除成功')
  }
}

export default Store
