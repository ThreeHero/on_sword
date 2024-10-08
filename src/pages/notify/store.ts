import { makeAutoObservable } from 'mobx'
import Api from './api'

class Store {
  constructor() {
    makeAutoObservable(this)
    this.getList()
    this.read()
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

  read = async () => {
    await Api.showNoticeTime({})
  }
}

export default Store
